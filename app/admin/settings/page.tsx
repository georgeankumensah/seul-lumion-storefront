"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useSettings } from "@/lib/hooks/use-settings"
import { Loader2 } from "lucide-react"

const locales = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
]

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
]

export default function SettingsPage() {
  const { settings, isLoading, mutate } = useSettings()
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to save settings")

      await mutate()
      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async (data: any) => {
    setSaving(true)

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to save settings")

      await mutate()
      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Manage your store details and contact information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" name="storeName" defaultValue={settings?.storeName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Contact Email</Label>
                    <Input id="storeEmail" name="storeEmail" type="email" defaultValue={settings?.storeEmail} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Phone Number</Label>
                    <Input id="storePhone" name="storePhone" type="tel" defaultValue={settings?.storePhone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Textarea id="storeAddress" name="storeAddress" defaultValue={settings?.storeAddress} />
                  </div>
                </div>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Store Preferences</CardTitle>
              <CardDescription>Customize your store's behavior and appearance.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Temporarily disable your store for maintenance</p>
                    </div>
                    <Switch name="maintenanceMode" defaultChecked={settings?.maintenanceMode} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Customer Reviews</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to leave product reviews</p>
                    </div>
                    <Switch name="customerReviews" defaultChecked={settings?.customerReviews} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Inventory Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified when products are low in stock</p>
                    </div>
                    <Switch name="inventoryNotifications" defaultChecked={settings?.inventoryNotifications} />
                  </div>
                </div>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which notifications you want to receive via email.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Confirmations</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Shipping Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about shipping status changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Customer Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for customer inquiries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Review Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when customers leave reviews</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Methods</CardTitle>
              <CardDescription>Configure your shipping options and rates.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Default Shipping Method</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger>
                          <SelectValue placeholder="Select shipping method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Shipping</SelectItem>
                          <SelectItem value="express">Express Shipping</SelectItem>
                          <SelectItem value="overnight">Overnight Shipping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="free-shipping-threshold">Free Shipping Threshold</Label>
                      <Input id="free-shipping-threshold" type="number" placeholder="Enter amount" defaultValue="100" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Shipping Zones</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Domestic Shipping</h4>
                          <p className="text-sm text-muted-foreground">United States</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">International Shipping</h4>
                          <p className="text-sm text-muted-foreground">Rest of World</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure your payment gateway settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Stripe Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Stripe Payments</Label>
                      <p className="text-sm text-muted-foreground">Accept credit card payments via Stripe</p>
                    </div>
                    <Switch
                      name="payments.stripe.enabled"
                      checked={settings?.payments?.stripe?.enabled}
                      onCheckedChange={(checked) =>
                        handleSave({
                          ...settings,
                          payments: {
                            ...settings?.payments,
                            stripe: {
                              ...settings?.payments?.stripe,
                              enabled: checked,
                            },
                          },
                        })
                      }
                    />
                  </div>

                  {settings?.payments?.stripe?.enabled && (
                    <div className="space-y-4 border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <Label>Test Mode</Label>
                        <Switch
                          name="payments.stripe.testMode"
                          checked={settings?.payments?.stripe?.testMode}
                          onCheckedChange={(checked) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                stripe: {
                                  ...settings?.payments?.stripe,
                                  testMode: checked,
                                },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Live Public Key</Label>
                        <Input
                          type="password"
                          value={settings?.payments?.stripe?.livePublicKey || ""}
                          onChange={(e) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                stripe: {
                                  ...settings?.payments?.stripe,
                                  livePublicKey: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Live Secret Key</Label>
                        <Input
                          type="password"
                          value={settings?.payments?.stripe?.liveSecretKey || ""}
                          onChange={(e) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                stripe: {
                                  ...settings?.payments?.stripe,
                                  liveSecretKey: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Test Public Key</Label>
                        <Input
                          type="password"
                          value={settings?.payments?.stripe?.testPublicKey || ""}
                          onChange={(e) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                stripe: {
                                  ...settings?.payments?.stripe,
                                  testPublicKey: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Test Secret Key</Label>
                        <Input
                          type="password"
                          value={settings?.payments?.stripe?.testSecretKey || ""}
                          onChange={(e) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                stripe: {
                                  ...settings?.payments?.stripe,
                                  testSecretKey: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Paystack Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Paystack Payments</Label>
                      <p className="text-sm text-muted-foreground">Accept payments via Paystack</p>
                    </div>
                    <Switch
                      name="payments.paystack.enabled"
                      checked={settings?.payments?.paystack?.enabled}
                      onCheckedChange={(checked) =>
                        handleSave({
                          ...settings,
                          payments: {
                            ...settings?.payments,
                            paystack: {
                              ...settings?.payments?.paystack,
                              enabled: checked,
                            },
                          },
                        })
                      }
                    />
                  </div>

                  {settings?.payments?.paystack?.enabled && (
                    <div className="space-y-4 border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <Label>Test Mode</Label>
                        <Switch
                          name="payments.paystack.testMode"
                          checked={settings?.payments?.paystack?.testMode}
                          onCheckedChange={(checked) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                paystack: {
                                  ...settings?.payments?.paystack,
                                  testMode: checked,
                                },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Live Public Key</Label>
                        <Input
                          type="password"
                          value={settings?.payments?.paystack?.livePublicKey || ""}
                          onChange={(e) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                paystack: {
                                  ...settings?.payments?.paystack,
                                  livePublicKey: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Live Secret Key</Label>
                        <Input
                          type="password"
                          value={settings?.payments?.paystack?.liveSecretKey || ""}
                          onChange={(e) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                paystack: {
                                  ...settings?.payments?.paystack,
                                  liveSecretKey: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Test Public Key</Label>
                        <Input
                          type="password"
                          value={settings?.payments?.paystack?.testPublicKey || ""}
                          onChange={(e) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                paystack: {
                                  ...settings?.payments?.paystack,
                                  testPublicKey: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Test Secret Key</Label>
                        <Input
                          type="password"
                          value={settings?.payments?.paystack?.testSecretKey || ""}
                          onChange={(e) =>
                            handleSave({
                              ...settings,
                              payments: {
                                ...settings?.payments,
                                paystack: {
                                  ...settings?.payments?.paystack,
                                  testSecretKey: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage your API keys and webhook configurations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>API Keys</Label>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Production API Key</h4>
                        <p className="text-sm text-muted-foreground">Last used: 2 hours ago</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Development API Key</h4>
                        <p className="text-sm text-muted-foreground">Last used: 5 days ago</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Webhook Endpoints</Label>
                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Order Webhook</h4>
                          <p className="text-sm text-muted-foreground">https://api.example.com/webhooks/orders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Customer Webhook</h4>
                          <p className="text-sm text-muted-foreground">https://api.example.com/webhooks/customers</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="button" variant="outline">
                  Add Webhook Endpoint
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="localization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
              <CardDescription>Configure languages and currencies.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <Select
                      value={settings?.localization?.defaultLanguage}
                      onValueChange={(value) =>
                        handleSave({
                          ...settings,
                          localization: {
                            ...settings?.localization,
                            defaultLanguage: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {locales.map((locale) => (
                          <SelectItem key={locale.code} value={locale.code}>
                            {locale.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select
                      value={settings?.localization?.defaultCurrency}
                      onValueChange={(value) =>
                        handleSave({
                          ...settings,
                          localization: {
                            ...settings?.localization,
                            defaultCurrency: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} ({currency.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Supported Languages</h3>
                  <div className="space-y-2">
                    {locales.map((locale) => (
                      <div key={locale.code} className="flex items-center justify-between">
                        <span>{locale.name}</span>
                        <Switch
                          checked={
                            settings?.localization?.supportedLanguages?.find((l: any) => l.code === locale.code)
                              ?.enabled ?? true
                          }
                          onCheckedChange={(checked) => {
                            const supportedLanguages = [...(settings?.localization?.supportedLanguages || [])]
                            const index = supportedLanguages.findIndex((l: any) => l.code === locale.code)
                            if (index >= 0) {
                              supportedLanguages[index].enabled = checked
                            } else {
                              supportedLanguages.push({
                                code: locale.code,
                                name: locale.name,
                                enabled: checked,
                              })
                            }
                            handleSave({
                              ...settings,
                              localization: {
                                ...settings?.localization,
                                supportedLanguages,
                              },
                            })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Supported Currencies</h3>
                  <div className="space-y-2">
                    {currencies.map((currency) => (
                      <div key={currency.code} className="flex items-center justify-between">
                        <span>
                          {currency.code} ({currency.symbol})
                        </span>
                        <Switch
                          checked={
                            settings?.localization?.supportedCurrencies?.find((c: any) => c.code === currency.code)
                              ?.enabled ?? true
                          }
                          onCheckedChange={(checked) => {
                            const supportedCurrencies = [...(settings?.localization?.supportedCurrencies || [])]
                            const index = supportedCurrencies.findIndex((c: any) => c.code === currency.code)
                            if (index >= 0) {
                              supportedCurrencies[index].enabled = checked
                            } else {
                              supportedCurrencies.push({
                                ...currency,
                                enabled: checked,
                              })
                            }
                            handleSave({
                              ...settings,
                              localization: {
                                ...settings?.localization,
                                supportedCurrencies,
                              },
                            })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

