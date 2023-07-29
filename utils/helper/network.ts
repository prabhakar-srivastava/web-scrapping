import { ScrapingBeeClient } from "scrapingbee"

export const getSearchResult = async (searchResult: string) => {
    try {
        const query = searchResult.split(' ').join('+')
        const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDimA-JmtX_rUHaPfZPD0q0ZRt5s4y1HHE&cx=14c283fe14ea147db&q=${query}`
        const reponse = await fetch(url)
        const data = await reponse.json()
        const item = data?.items?.slice(0, 5)
        return item
    } catch (error) {
        console.log(error, 'Fetch error');

    }

}

export const scrapping = async (url: string) => {
    const API_KEY = '4L0AEIONLNP16JSVXBATDFTZMGHWN5C5DH1BR8GKDPP63LKRYZRBEXFYNZJN1HVQUTM8H4DZC2GOM2JQ'
    try {
        const client = new ScrapingBeeClient(API_KEY)
        const rep = await client.get({
            url: url,
            params: {
                // Wrap response in JSON
                json_response: true,
                extract_rules: { "text": "body" }
            }
        })

        var decoder = new TextDecoder();
        var text = decoder.decode(rep.data);
        const jsonText = JSON.parse(text)
        return jsonText
    } catch (error) {
        console.log(error, 'scrapping');

    }


}