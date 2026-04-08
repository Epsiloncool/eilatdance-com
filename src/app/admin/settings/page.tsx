'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, Activity } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        // Инициализируем дефолтные значения, если их нет
        setSettings({
          phone: '', 
          email: '', 
          address: '', 
          facebook: '', 
          instagram: '', 
          youtube: '',
          whatsapp: '',
          map_url: '',
          payment_phone: '',
		  payment_phone_display: '',
		  google_analytics: '',
          ...data
        });
      });
  }, []);

  const handleChange = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      toast.success('Settings saved');
    } catch (e) {
      toast.error('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="contacts">
        <TabsList>
          <TabsTrigger value="contacts">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="payment">Payment & Map</TabsTrigger>
		  <TabsTrigger value="scripts" className="flex gap-2">
            <Activity className="h-4 w-4" /> Analytics & Scripts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>General Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Phone Number (Display)</Label>
                <Input value={settings.phone} onChange={e => handleChange('phone', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={settings.email} onChange={e => handleChange('email', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={settings.address} onChange={e => handleChange('address', e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Facebook URL</Label>
                <Input value={settings.facebook} onChange={e => handleChange('facebook', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Instagram URL</Label>
                <Input value={settings.instagram} onChange={e => handleChange('instagram', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>YouTube URL</Label>
                <Input value={settings.youtube} onChange={e => handleChange('youtube', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number (format: 972...)</Label>
                <Input value={settings.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bit Payment Phone</Label>
                <Input value={settings.payment_phone} onChange={e => handleChange('payment_phone', e.target.value)} />
              </div>
      		  <div className="space-y-2">
        		<Label>Bit Payment Phone (For Display)</Label>
        		<Input value={settings.payment_phone_display} onChange={e => handleChange('payment_phone_display', e.target.value)} placeholder="05x-xxx-xxxx" />
        			<p className="text-xs text-muted-foreground">Leave empty to use system number. This is what users see.</p>
      		  </div>
              {/* Тут можно добавить загрузку QR кода, если нужно, используя MediaManager */}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Google Map</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Embed URL (src from iframe)</Label>
                <Input value={settings.map_url} onChange={e => handleChange('map_url', e.target.value)} placeholder="https://www.google.com/maps/embed?..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scripts" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Head Scripts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Google Analytics / Custom JS</Label>
                <p className="text-xs text-muted-foreground">
                  Paste the full script code here (e.g. &lt;script&gt;...&lt;/script&gt;). 
                  This code will be injected into the &lt;head&gt; of every page.
                </p>
                <Textarea 
                  value={settings.google_analytics} 
                  onChange={e => handleChange('google_analytics', e.target.value)} 
                  className="font-mono text-xs min-h-[300px]"
                  placeholder="<!-- Google tag (gtag.js) -->&#10;<script>...</script>"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>		
      </Tabs>
    </div>
  );
}