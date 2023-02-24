import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils"

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const [converting, setConverting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log(youtubeID)

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: { id: youtubeID },
      headers: {
        'X-RapidAPI-Key': "af8f421a22msh6ece94f4ab01a7fp1560d9jsn9ca8b1cb2a81",
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    }

    setConverting(true); // Set converting state to true before making API request

    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))
      .finally(() => setConverting(false)); // Set converting state to false after API request completes

    inputUrlRef.current.value = '';
  }

  return (
    <div className="app">
      <span className="logo">youtube2mp3</span>
      <section className="content">
        <h1 className="content_title">Youtube to MP3 Converter</h1>
        <p className="content_description">
          Transforms youtube videos to mp3
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Paste the youtube video url" className="form_input" type="text" />
          <button type="submit" className="form_button">Search</button>
        </form>

        {converting ? (
          <p className="converting_message">Converting ...</p>
        ) : (
          urlResult ? (
            <a className="download_btn" target='_blank' rel="noreferrer" href={urlResult}>Download MP3</a>
          ) : null
        )}
      </section>
    </div>
  )
}

export default App
