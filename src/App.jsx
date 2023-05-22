import { useEffect, useState } from 'react'

function App () {
  const [mediaInfo, setMediaInfo] = useState({})
  const userName = 'SIUUU'

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setMediaInfo(data?.media?.track))
  }, [])

  // console.log(mediaInfo)

  const convertHMS = value => {
    const sec = parseInt(value, 10) // convert value to number if it's string
    let hours = Math.floor(sec / 3600) // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60) // get minutes
    let seconds = sec - hours * 3600 - minutes * 60 //  get seconds
    if (value >= 3600) {
      return hours + ' h ' + minutes + ' min '
    }
    if (value < 3600) {
      return minutes + ' min ' + seconds + ' s'
    }
  }

  const d = new Date()
  const date = d.getDate()
  const month = d.getMonth() + 1 // Since getMonth() returns month from 0-11 not 1-12
  const year = d.getFullYear()
  const dateStr = date + '/' + month + '/' + year

  // const generate = () => {
  //   console.log(mediaInfo[0])
  // }
  const length = mediaInfo.length
  for (let i = 0; i < length; i++) {
    for (const [key, value] of Object.entries(mediaInfo[i])) {
      if (value === 'General') {
        const fileGibSize = (mediaInfo[i].FileSize / 1073741824).toFixed(1)
        const fileMibSize = (mediaInfo[i].FileSize / 1048576).toFixed()
        const general = `[font=Consolas][size=3][color=#4c838b]G[/color][color=#518a8f]e[/color][color=#579292]n[/color][color=#5c9996]e[/color][color=#61a099]r[/color][color=#66a79d]a[/color][color=#6cafa0]l[/color] [/size] [color=#4c838b]⋄[/color]  [/font]
        [size=2][font=Consolas]Filename.......: ${mediaInfo[i].Movie}.${
          mediaInfo[i].FileExtension
        } 
        Container......: ${mediaInfo[i].Format}
        Duration.......: ${convertHMS(mediaInfo[i].Duration)}
        Size...........: ${fileGibSize >= 1 ? fileGibSize : fileMibSize} ${
          fileGibSize >= 1 ? 'GiB' : 'MiB'
        }
        Chapters.......: Yes (Numbered)
        Remuxer........: [color=#3c758f]${userName}[/color][color=#2683cc]@[/color][color=#3e669c]⋿[/color][color=#3d5692]✗[/color][color=#379ac3]t[/color][color=#389bc7]e[/color][color=#3a9bcb]r[/color][color=#3c9cce]m[/color][color=#3e9dd2]i[/color][color=#409dd6]n[/color][color=#429eda]a[/color][color=#439fdd]t[/color][color=#459fe1]o[/color][color=#47a0e5]r[/color]
        Release Date...: ${dateStr}[/font][/size]`

        return general
      }

      if (value === 'Video') {
        const videoBitrateMb = (mediaInfo[i].BitRate / 1000000).toString(1)
        const videoBitrateKb = Math.round(
          (mediaInfo[i].BitRate / 1000).toString(1)
        )
        const video = `[size=3][font=Consolas][color=#4c838b]V[/color][color=#559091]i[/color][color=#5f9d98]d[/color][color=#68a99e]e[/color][color=#71b6a4]o[/color][/size] [color=#4c838b]⋄[/color][/font]
        [size=2][font=Consolas]Codec..........: ${mediaInfo[i].Format} ${
          mediaInfo[i].Format_Profile
        }@${mediaInfo[i].Format_Level} ${mediaInfo[i].BitDepth} bits
        Type...........: ${mediaInfo[i].ScanType}
        Resolution.....: ${mediaInfo[i].Sampled_Width}x${
          mediaInfo[i].Sampled_Height
        }
        Bit rate.......: ${
          videoBitrateMb >= 10 ? videoBitrateMb : videoBitrateKb
        } ${videoBitrateMb >= 10 ? 'Mb/s' : 'kb/s'}
        Frame rate.....: ${mediaInfo[i].FrameRate} FPS[/size][/font]`

        return video
      }
    }
  }

  return (
    <>
      <div>
        <textarea name='mediabox' id='mbox' cols='30' rows='10'></textarea>
        {/* <button onClick={generate()}>Generate</button> */}
      </div>
    </>
  )
}

export default App
