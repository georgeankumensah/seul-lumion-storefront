"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaPicker } from "@/components/admin/media-picker"
import { Loader2 } from "lucide-react"
import { useHomeContent } from "@/lib/hooks/use-home-content"

export default function ContentPage() {
  const { content, isLoading, mutate } = useHomeContent()
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async (data: any) => {
    setSaving(true)
    try {
      const res = await fetch("/api/home-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to save content")

      await mutate()
      toast({
        title: "Success",
        description: "Content updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
      </div>

      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="font-medium">Background Image</label>
                <MediaPicker
                  value={content?.hero?.image ? [content.hero.image] : []}
                  onChange={(urls) => handleSave({ ...content, hero: { ...content?.hero, image: urls[0] } })}
                  maxFiles={1}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Title</label>
                <Input
                  value={content?.hero?.title || ""}
                  onChange={(e) => handleSave({ ...content, hero: { ...content?.hero, title: e.target.value } })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Subtitle</label>
                <Textarea
                  value={content?.hero?.subtitle || ""}
                  onChange={(e) => handleSave({ ...content, hero: { ...content?.hero, subtitle: e.target.value } })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Button Text</label>
                  <Input
                    value={content?.hero?.buttonText || ""}
                    onChange={(e) => handleSave({ ...content, hero: { ...content?.hero, buttonText: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Button Link</label>
                  <Input
                    value={content?.hero?.buttonLink || ""}
                    onChange={(e) => handleSave({ ...content, hero: { ...content?.hero, buttonLink: e.target.value } })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add similar sections for Gallery, Collections, and Banners */}
      </Tabs>
    </div>
  )
}

