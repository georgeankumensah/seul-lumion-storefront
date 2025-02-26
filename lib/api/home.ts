export async function getHomeContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/home-content`)
    if (!res.ok) throw new Error("Failed to fetch home content")
    return res.json()
  } catch (error) {
    console.error("Error fetching home content:", error)
    return null
  }
}

