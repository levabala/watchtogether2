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
    
    // Wait for offer to be generated and have content
    await hostWindow.waitForFunction(() => {
      const offerElement = document.querySelector('[data-testid="offer-display"]') as HTMLTextAreaElement;
      return offerElement && offerElement.value && offerElement.value.trim().length > 0;
    }, { timeout: 15000 });
    
    // Get the offer from host
    const offerText = await hostWindow.locator('[data-testid="offer-display"]').inputValue();
    expect(offerText).toBeTruthy();
    console.log('Offer length:', offerText.length);
    
    // On client: paste the offer and connect
    await clientWindow.locator('[data-testid="offer-input"]').fill(offerText!);
    await clientWindow.locator('[data-testid="connect-button"]').click();
    
    // Wait for answer to be generated on client
    await clientWindow.waitForFunction(() => {
      const answerElement = document.querySelector('[data-testid="answer-display"]') as HTMLTextAreaElement;
      return answerElement && answerElement.value && answerElement.value.trim().length > 0;
    }, { timeout: 15000 });
    
    // Get the answer from client
    const answerText = await clientWindow.locator('[data-testid="answer-display"]').inputValue();
    expect(answerText).toBeTruthy();
    console.log('Answer length:', answerText.length);
    
    // On host: paste the answer (auto-accept should trigger)
    await hostWindow.locator('[data-testid="answer-input"]').fill(answerText!);
    
    // Wait for auto-accept to complete (input should be cleared)
    await hostWindow.waitForFunction(() => {
      const answerInput = document.querySelector('[data-testid="answer-input"]') as HTMLTextAreaElement;
      return answerInput && answerInput.value.trim() === '';
    }, { timeout: 10000 });
    
    // Wait for connection to be established (look for connection status)
    console.log('Waiting for connection to establish...');
    
    // Check current status first
    const initialHostStatus = await hostWindow.locator('[data-testid="connection-status"]').textContent();
    const initialClientStatus = await clientWindow.locator('[data-testid="connection-status"]').textContent();
    console.log('Initial host status:', initialHostStatus);
    console.log('Initial client status:', initialClientStatus);
    
    // Wait for either side to show connected
    try {
      await Promise.race([
        hostWindow.waitForSelector('[data-testid="connection-status"]:has-text("connected")', { timeout: 30000 }),
        clientWindow.waitForSelector('[data-testid="connection-status"]:has-text("connected")', { timeout: 30000 })
      ]);
    } catch (error) {
      // If timeout, check final status
      const finalHostStatus = await hostWindow.locator('[data-testid="connection-status"]').textContent();
      const finalClientStatus = await clientWindow.locator('[data-testid="connection-status"]').textContent();
      console.log('Final host status:', finalHostStatus);
      console.log('Final client status:', finalClientStatus);
      throw error;
    }
    
    // Verify both sides show connected status
    const hostStatus = await hostWindow.locator('[data-testid="connection-status"]').textContent();
    const clientStatus = await clientWindow.locator('[data-testid="connection-status"]').textContent();
    
    console.log('Final host status:', hostStatus);
    console.log('Final client status:', clientStatus);
    
    expect(hostStatus).toContain('connected');
    expect(clientStatus).toContain('connected');
    
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
      args: [path.join(__dirname, '..', 'out/main/index.js'), '--host']
    });
    
    const hostWindow = await hostApp.firstWindow();
    await hostWindow.waitForLoadState('domcontentloaded');
    
    // Initially should show "Start Hosting" button
    await expect(hostWindow.locator('[data-testid="start-hosting-button"]')).toBeVisible();
    
    // Click start hosting
    await hostWindow.locator('[data-testid="start-hosting-button"]').click();
    
    // Should show offer display
    await expect(hostWindow.locator('[data-testid="offer-display"]')).toBeVisible();
    
    // Should show answer input area
    await expect(hostWindow.locator('[data-testid="answer-input"]')).toBeVisible();
    
    await hostWindow.screenshot({ path: 'host-ui-states.png' });
    
    console.log('✅ UI state test completed!');
    
    await hostApp.close();
  });

  test('should handle invalid offer/answer gracefully', async () => {
    console.log('🚀 Starting error handling test...');
    
    const clientApp = await electron.launch({ 
      args: [path.join(__dirname, '..', 'out/main/index.js'), '--client']
    });
    
    const clientWindow = await clientApp.firstWindow();
    await clientWindow.waitForLoadState('domcontentloaded');
    
    // Try to connect with invalid offer
    await clientWindow.locator('[data-testid="offer-input"]').fill('invalid-offer-data');
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