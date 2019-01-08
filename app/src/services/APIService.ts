export const getArtistToPreview = async (value: string) => {
    const lastFmUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${value}&api_key=${process.env.LAST_FM_KEY}&format=json`
    const response = await fetch(lastFmUrl)
    const { results: { artistmatches: { artist: artists }}} = await response.json()
    const [artistToPreview] = artists

    return artistToPreview || null
}
