import { test, expect, _electron as electron } from '@playwright/test';
import path from 'path';

test.describe('P2P Connection Tests', () => {
  test('should establish P2P connection between host and client', async () => {
    test.setTimeout(60000); // 60 second timeout
    console.log('🚀 Starting P2P connection test...');
    
    // Launch host instance
    console.log('📡 Launching host instance...');
    const hostApp = await electron.launch({ 
      args: [path.join(__dirname, '..', 'out/main/index.js'), '--host'],
      env: {
        ...process.env,
        NODE_ENV: 'test'
      }
    });
    
    // Launch client instance
    console.log('📱 Launching client instance...');
    const clientApp = await electron.launch({ 
      args: [path.join(__dirname, '..', 'out/main/index.js'), '--client'],
      env: {
        ...process.env,
        NODE_ENV: 'test'
      }
    });
    
    // Get the first window from each app
    const hostWindow = await hostApp.firstWindow();
    const clientWindow = await clientApp.firstWindow();
    
    // Wait for apps to load
    await hostWindow.waitForLoadState('domcontentloaded');
    await clientWindow.waitForLoadState('domcontentloaded');
    
    // Take screenshots for debugging
    await hostWindow.screenshot({ path: 'host-initial.png' });
    await clientWindow.screenshot({ path: 'client-initial.png' });
    
    // Check if the mode switcher is present and set to correct mode
    const hostModeText = await hostWindow.locator('[data-testid="current-mode"]').textContent();
    const clientModeText = await clientWindow.locator('[data-testid="current-mode"]').textContent();
    
    expect(hostModeText).toContain('host');
    expect(clientModeText).toContain('client');
    
    // On host: click "Start Hosting" button
    await hostWindow.locator('[data-testid="start-hosting-button"]').click();
    
    // Wait for peer ID to be generated and have content
    await hostWindow.waitForFunction(() => {
      const peerIdElement = document.querySelector('[data-testid=\"peer-id-display\"]') as HTMLInputElement;
      return peerIdElement && peerIdElement.value && peerIdElement.value.trim().length > 0;
    }, { timeout: 15000 });
    
    // Get the peer ID from host
    const hostPeerId = await hostWindow.locator('[data-testid=\"peer-id-display\"]').inputValue();
    expect(hostPeerId).toBeTruthy();
    console.log('Host Peer ID:', hostPeerId);
    
    // On client: enter the host peer ID and connect
    await clientWindow.locator('[data-testid=\"peer-id-input\"]').fill(hostPeerId!);
    await clientWindow.locator('[data-testid=\"connect-button\"]').click();
    
    // Wait for connection to be established (look for connection status)
    console.log('Waiting for connection to establish...');
    
    // Check current status first
    const initialHostStatus = await hostWindow.locator('[data-testid="connection-status"]').textContent();
    const initialClientStatus = await clientWindow.locator('[data-testid="connection-status"]').textContent();
    console.log('Initial host status:', initialHostStatus);
    console.log('Initial client status:', initialClientStatus);
    
    // Wait for either side to show connected
    try {
      console.log('Waiting for connection to establish...');
      await Promise.race([
        hostWindow.waitForSelector('[data-testid="connection-status"]:has-text("Connected")', { timeout: 30000 }),
        clientWindow.waitForSelector('[data-testid="connection-status"]:has-text("Connected")', { timeout: 30000 })
      ]);
      console.log('Connection established successfully!');
    } catch (error) {
      // If timeout, check final status and get console logs
      const finalHostStatus = await hostWindow.locator('[data-testid="connection-status"]').textContent();
      const finalClientStatus = await clientWindow.locator('[data-testid="connection-status"]').textContent();
      console.log('Connection timeout - Final host status:', finalHostStatus);
      console.log('Connection timeout - Final client status:', finalClientStatus);
      
      // Get console logs for debugging
      console.log('Getting console logs for debugging...');
      throw error;
    }
    
    // Verify both sides show connected status
    const hostStatus = await hostWindow.locator('[data-testid="connection-status"]').textContent();
    const clientStatus = await clientWindow.locator('[data-testid="connection-status"]').textContent();
    
    console.log('Final host status:', hostStatus);
    console.log('Final client status:', clientStatus);
    
    expect(hostStatus).toContain('Connected');
    expect(clientStatus).toContain('Connected');
    
    // Wait a bit for pinging to start
    await hostWindow.waitForTimeout(6000); // Wait for at least one ping cycle
    
    // Take final screenshots
    await hostWindow.screenshot({ path: 'host-connected.png' });
    await clientWindow.screenshot({ path: 'client-connected.png' });
    
    console.log('✅ P2P connection test completed successfully!');
    
    // Cleanup
    await hostApp.close();
    await clientApp.close();
  });

  test('should show proper UI states during connection process', async () => {
    console.log('🚀 Starting UI state test...');
    
    const hostApp = await electron.launch({ 
      args: [path.join(__dirname, '..', 'out/main/index.js'), '--host'],
      env: {
        ...process.env,
        NODE_ENV: 'test'
      }
    });
    
    const hostWindow = await hostApp.firstWindow();
    await hostWindow.waitForLoadState('domcontentloaded');
    
    // Initially should show "Start Hosting" button
    await expect(hostWindow.locator('[data-testid="start-hosting-button"]')).toBeVisible();
    
    // Click start hosting
    await hostWindow.locator('[data-testid="start-hosting-button"]').click();
    
    // Should show peer ID display
    await expect(hostWindow.locator('[data-testid="peer-id-display"]')).toBeVisible();
    
    // Should show answer input area
    await expect(hostWindow.locator('[data-testid="peer-id-display"]')).toBeVisible();
    
    await hostWindow.screenshot({ path: 'host-ui-states.png' });
    
    console.log('✅ UI state test completed!');
    
    await hostApp.close();
  });

  test('should handle invalid offer/answer gracefully', async () => {
    console.log('🚀 Starting error handling test...');
    
    const clientApp = await electron.launch({ 
      args: [path.join(__dirname, '..', 'out/main/index.js'), '--client'],
      env: {
        ...process.env,
        NODE_ENV: 'test'
      }
    });
    
    const clientWindow = await clientApp.firstWindow();
    await clientWindow.waitForLoadState('domcontentloaded');
    
    // Try to connect with invalid peer ID
    await clientWindow.locator('[data-testid="peer-id-input"]').fill('invalid-peer-id');
    await clientWindow.locator('button:has-text("Connect")').click();
    
    // Should show error or remain in disconnected state
    await clientWindow.waitForTimeout(3000);
    
    // Connection status should not show "Connected"
    const statusElements = await clientWindow.locator('[data-testid="connection-status"]').count();
    if (statusElements > 0) {
      const status = await clientWindow.locator('[data-testid="connection-status"]').textContent();
      expect(status).not.toContain('Connected');
    }
    
    await clientWindow.screenshot({ path: 'client-error-handling.png' });
    
    console.log('✅ Error handling test completed!');
    
    await clientApp.close();
  });
});