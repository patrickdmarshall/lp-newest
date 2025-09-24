"use server"

export async function submitArtistApplication(prevState: any, formData: FormData) {
  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const artistName = formData.get("artistName") as string
    const email = formData.get("email") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = formData.get("phone") as string
    const location = formData.get("location") as string
    const genre = formData.get("genre") as string
    const bio = formData.get("bio") as string
    const experienceLevel = formData.get("experienceLevel") as string
    const hasEquipment = formData.get("hasEquipment") === "true"
    const canTravel = formData.get("canTravel") === "true"
    const spotifyUrl = formData.get("spotifyUrl") as string
    const instagramUrl = formData.get("instagramUrl") as string
    const additionalInfo = formData.get("additionalInfo") as string
    const agreedToTerms = formData.get("agreedToTerms") === "true"
    const profilePicture = formData.get("profilePicture") as string

    // Mock validation
    if (!artistName || !email || !phone || !location || !genre || !bio || !experienceLevel) {
      return {
        success: false,
        error: "Missing required fields. Please fill out all required information.",
      }
    }

    if (!agreedToTerms) {
      return {
        success: false,
        error: "You must agree to the terms and conditions.",
      }
    }

    // In a real app, you would:
    // 1. Validate all form data
    // 2. Save to database (Supabase)
    // 3. Send confirmation email
    // 4. Create user account if needed

    return {
      success: true,
      message: `Application submitted successfully for ${artistName}! We'll review your application and get back to you within 3-5 business days.`,
    }
  } catch (error) {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function submitVenueApplication(prevState: any, formData: FormData) {
  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const venueName = formData.get("venueName") as string
    const contactName = formData.get("contactName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const zipCode = formData.get("zipCode") as string
    const capacity = formData.get("capacity") as string
    const venueType = formData.get("venueType") as string
    const description = formData.get("description") as string
    const hasStage = formData.get("hasStage") === "true"
    const hasSoundSystem = formData.get("hasSoundSystem") === "true"
    const hasLighting = formData.get("hasLighting") === "true"
    const hasParking = formData.get("hasParking") === "true"
    const website = formData.get("website") as string
    const instagramUrl = formData.get("instagramUrl") as string
    const additionalInfo = formData.get("additionalInfo") as string
    const agreedToTerms = formData.get("agreedToTerms") === "true"
    const venuePicture = formData.get("venuePicture") as string

    // Mock validation
    if (
      !venueName ||
      !contactName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !capacity ||
      !venueType ||
      !description
    ) {
      return {
        success: false,
        error: "Missing required fields. Please fill out all required information.",
      }
    }

    if (!agreedToTerms) {
      return {
        success: false,
        error: "You must agree to the terms and conditions.",
      }
    }

    // In a real app, you would:
    // 1. Validate all form data
    // 2. Save to database (Supabase)
    // 3. Send confirmation email
    // 4. Create user account if needed

    return {
      success: true,
      message: `Application submitted successfully for ${venueName}! We'll review your application and get back to you within 3-5 business days.`,
    }
  } catch (error) {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
