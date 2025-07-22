'use client';

import ContactForm from '@/components/ContactForm';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { sendToWebhookOnly } from '@/lib/email';
import { toast } from 'sonner';

export default function WebhookTestPage() {
  const [debugMode, setDebugMode] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const runDirectWebhookTest = async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '0612345678',
      city: 'Test City',
      message: 'This is a direct webhook test message',
    };

    try {
      const startTime = Date.now();
      await sendToWebhookOnly(testData);
      const responseTime = Date.now() - startTime;
      
      const result = `✅ Direct webhook test successful (${responseTime}ms)`;
      setTestResults(prev => [...prev, result]);
      toast.success(result);
    } catch (error) {
      const result = `❌ Direct webhook test failed: ${error}`;
      setTestResults(prev => [...prev, result]);
      toast.error('Webhook test failed');
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">GoHighLevel Webhook Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Test Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Test Form with Dual Submission</h2>
            <ContactForm
              title="Test Webhook Integration"
              subtitle="Test formulier voor GHL webhook met dual submission"
              showCityField={true}
              redirectUrl="#"
              formType="webhook_test"
            />
          </div>

          {/* Test Controls */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
            
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
              <div>
                <h3 className="font-medium mb-2">Debug Mode</h3>
                <Button
                  onClick={() => setDebugMode(!debugMode)}
                  variant={debugMode ? "default" : "outline"}
                  className="w-full"
                >
                  {debugMode ? 'Debug Mode ON' : 'Debug Mode OFF'}
                </Button>
                {debugMode && (
                  <p className="text-sm text-gray-600 mt-2">
                    Check browser console for detailed logs
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Direct Webhook Test</h3>
                <Button
                  onClick={runDirectWebhookTest}
                  variant="secondary"
                  className="w-full"
                >
                  Run Direct Webhook Test
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Tests webhook endpoint directly without EmailJS
                </p>
              </div>

              {testResults.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Test Results</h3>
                    <Button
                      onClick={clearResults}
                      variant="ghost"
                      size="sm"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-sm space-y-1">
                    {testResults.map((result, index) => (
                      <div key={index}>{result}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Webhook Information */}
            <div className="mt-6 bg-blue-50 p-6 rounded-lg">
              <h3 className="font-medium mb-2">Webhook Configuration</h3>
              <div className="text-sm space-y-1">
                <p><strong>Endpoint:</strong> GoHighLevel Webhook</p>
                <p><strong>Method:</strong> POST</p>
                <p><strong>Content-Type:</strong> application/json</p>
                <p><strong>Fallback:</strong> EmailJS</p>
              </div>
            </div>

            {/* Expected Data Structure */}
            <div className="mt-6 bg-gray-100 p-6 rounded-lg">
              <h3 className="font-medium mb-2">Expected Data Structure</h3>
              <pre className="text-xs overflow-x-auto">
{`{
  "data": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "city": "string",
    "message": "string"
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Enable Debug Mode to see detailed console logs</li>
            <li>Fill out the test form and submit to test dual submission</li>
            <li>Use &quot;Run Direct Webhook Test&quot; to test webhook-only submission</li>
            <li>Check GoHighLevel to verify data was received</li>
            <li>Monitor test results in the control panel</li>
            <li>Check browser console for detailed debug information</li>
          </ol>
        </div>
      </div>
    </div>
  );
}