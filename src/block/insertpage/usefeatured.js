const { 
  useSelect 
} = wp.data

export const useFeaturedImage = pageId => {

  const page = useSelect(
    select => pageId ? 
    select('core')
    .getEntityRecord(
      'postType', 
      'page', 
      pageId
    )
    : 
    null,
    [ pageId ]
  )

  const media = useSelect(
    select =>
    page && page.featured_media ? 
    select('core')
    .getMedia(page.featured_media)
    : 
    null,
    [ page ]
  )

  if (!page) return { 
    loading: true, 
    url: null, 
    alt: null 
  }
  if (!page.featured_media) return { 
    loading: false, 
    url: null, 
    alt: null 
  }
  if (!media) return { 
    loading: true, 
    url: null, 
    alt: null 
  }

  return {
    loading: false,
    url: media.source_url,
    alt: media.alt_text || '',
  }
}