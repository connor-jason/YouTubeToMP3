async function convertToMp3() {
    // grab youtube url and encode it
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    const encodedUrl = encodeURIComponent(youtubeUrl);
    const apiUrl = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/custom/?url=${encodedUrl}&quality=320`;

    // api headers (add your own api key)
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'supersecret',
            'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
    };

    // make the api call
    try {
        document.getElementById('result').innerText = 'Attemping to convert video.'

        const response = await fetch(apiUrl, options);
        const result = await response.json();
        const downloadUrl = result.dlink;

        // if the download was successful, create a link and click it to download the mp3
        if (result.status === "finished" && downloadUrl) {
            const link = document.createElement('a');
            link.href = downloadUrl;

            // click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // display success message and offer link if the download didn't start for whatever reason
            document.getElementById('result').innerText = 'Video successfully downloaded. If your download did not start, click ';
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.innerText = 'here';
            document.getElementById('result').appendChild(downloadLink);
        } else {
            document.getElementById('result').innerText = 'Conversion in progress. Please try again in a few moments.';
        }
    } catch (error) {
        console.error(error);
        document.getElementById('result').innerText = 'Error: ' + error.message;
    }
}