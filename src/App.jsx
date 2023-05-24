import { useEffect, useState } from 'react'

function App () {
  const [mediaInfo, setMediaInfo] = useState([])
  const userName = 'SIUUU'
  let allInfo = ''
  const langArr = []

  const getLanguage = fLang => {
    const fullLang = new Intl.DisplayNames(['en'], { type: 'language' })
    return fullLang.of(fLang)
  }

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setMediaInfo(data?.media?.track))
  }, [])

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

  let mainArrLength = 0

  mediaInfo.map(info => {
    if (info['@type'] === 'Menu') {
      mainArrLength = mediaInfo.length - 2
    } else {
      mainArrLength = mediaInfo.length - 1
    }
  })

  // const generate = () => {
  //   console.log(mediaInfo[0])
  // }
  // const length = mediaInfo.length
  // for (let i = 0; i < length; i++) {
  //   for (const [key, value] of Object.entries(info)) {
  //     if (value === 'General') {
  //       const fileGibSize = (info.FileSize / 1073741824).toFixed(1)
  //       const fileMibSize = (info.FileSize / 1048576).toFixed()
  //       const general = `[font=Consolas][size=3][color=#4c838b]G[/color][color=#518a8f]e[/color][color=#579292]n[/color][color=#5c9996]e[/color][color=#61a099]r[/color][color=#66a79d]a[/color][color=#6cafa0]l[/color] [/size] [color=#4c838b]⋄[/color]  [/font]
  //       [size=2][font=Consolas]Filename.......: ${info.Movie}.${
  //         info.FileExtension
  //       }
  //       Container......: ${info.Format}
  //       Duration.......: ${convertHMS(info.Duration)}
  //       Size...........: ${fileGibSize >= 1 ? fileGibSize : fileMibSize} ${
  //         fileGibSize >= 1 ? 'GiB' : 'MiB'
  //       }
  //       Chapters.......: Yes (Numbered)
  //       Remuxer........: [color=#3c758f]${userName}[/color][color=#2683cc]@[/color][color=#3e669c]⋿[/color][color=#3d5692]✗[/color][color=#379ac3]t[/color][color=#389bc7]e[/color][color=#3a9bcb]r[/color][color=#3c9cce]m[/color][color=#3e9dd2]i[/color][color=#409dd6]n[/color][color=#429eda]a[/color][color=#439fdd]t[/color][color=#459fe1]o[/color][color=#47a0e5]r[/color]
  //       Release Date...: ${dateStr}[/font][/size]`

  //       return general
  //     }

  //     if (value === 'Video') {
  //       const videoBitrateMb = (info.BitRate / 1000000).toString(1)
  //       const videoBitrateKb = Math.round(
  //         (info.BitRate / 1000).toString(1)
  //       )
  //       const video = `[size=3][font=Consolas][color=#4c838b]V[/color][color=#559091]i[/color][color=#5f9d98]d[/color][color=#68a99e]e[/color][color=#71b6a4]o[/color][/size] [color=#4c838b]⋄[/color][/font]
  //       [size=2][font=Consolas]Codec..........: ${info.Format} ${
  //         info.Format_Profile
  //       }@${info.Format_Level} ${info.BitDepth} bits
  //       Type...........: ${info.ScanType}
  //       Resolution.....: ${info.Sampled_Width}x${
  //         info.Sampled_Height
  //       }
  //       Bit rate.......: ${
  //         videoBitrateMb >= 10 ? videoBitrateMb : videoBitrateKb
  //       } ${videoBitrateMb >= 10 ? 'Mb/s' : 'kb/s'}
  //       Frame rate.....: ${info.FrameRate} FPS[/size][/font]`

  //       return video
  //     }
  //   }
  // }

  return (
    <>
      <div>
        {/* <textarea name='mediabox' id='mbox' cols='90' rows='30'></textarea> */}
        {/* <button onClick={generate()}>Generate</button> */}
        <textarea name='outputbox' id='obox' cols='90' rows='30'></textarea>
        {mediaInfo.map((info, index) => {
          if (info['@type'] === 'General') {
            const fileGibSize = info.FileSize / 1073741824
            const fileMibSize = (info.FileSize / 1048576).toFixed()
            const general = `[font=Consolas][size=3][color=#4c838b]G[/color][color=#518a8f]e[/color][color=#579292]n[/color][color=#5c9996]e[/color][color=#61a099]r[/color][color=#66a79d]a[/color][color=#6cafa0]l[/color] [/size] [color=#4c838b]⋄[/color]  [/font]
[size=2][font=Consolas]Filename.......: ${info.Movie}.${info.FileExtension} 
Container......: ${info.Format}
Duration.......: ${convertHMS(info.Duration)}
Size...........: ${
              fileGibSize >= 10
                ? fileGibSize.toFixed(1)
                : fileGibSize >= 1
                ? fileGibSize.toFixed(2)
                : fileMibSize
            } ${fileGibSize >= 1 ? 'GiB' : 'MiB'}
Chapters.......: Yes (Numbered)
Remuxer........: [color=#3c758f]${userName}[/color][color=#2683cc]@[/color][color=#3e669c]⋿[/color][color=#3d5692]✗[/color][color=#379ac3]t[/color][color=#389bc7]e[/color][color=#3a9bcb]r[/color][color=#3c9cce]m[/color][color=#3e9dd2]i[/color][color=#409dd6]n[/color][color=#429eda]a[/color][color=#439fdd]t[/color][color=#459fe1]o[/color][color=#47a0e5]r[/color]
Release Date...: ${dateStr}[/font][/size]
`
            allInfo += general + '\n'
          }

          if (info['@type'] === 'Video') {
            const videoBitrateMb = (info.BitRate / 1000000).toFixed(1)
            const videoBitrateKb = Math.round((info.BitRate / 1000).toFixed(1))
            const video = `[size=3][font=Consolas][color=#4c838b]V[/color][color=#559091]i[/color][color=#5f9d98]d[/color][color=#68a99e]e[/color][color=#71b6a4]o[/color][/size] [color=#4c838b]⋄[/color][/font]
[size=2][font=Consolas]Codec..........: ${info.Format} ${info.Format_Profile}@${
              info.Format === 'HEVC'
                ? 'L' + info.Format_Level
                : info.Format === 'VC-1'
                ? 'L' + info.Format_Level
                : info.Format === 'AVC'
                ? 'L' + info.Format_Level
                : info.Format_Level
            }${info.Format_Tier ? '@' + info.Format_Tier : ''} ${
              info.BitDepth
            } bits
Type...........: ${info.ScanType ? info.ScanType : 'Progressive'}
Resolution.....: ${info.Sampled_Width}x${info.Sampled_Height}
Bit rate.......: ${videoBitrateMb >= 10 ? videoBitrateMb : videoBitrateKb} ${
              videoBitrateMb >= 10 ? 'Mb/s' : 'kb/s'
            }
Frame rate.....: ${info.FrameRate} FPS[/size][/font]
`
            allInfo += video + '\n'
          }

          if (info['@type'] === 'Audio') {
            const audioBitrateKb = Math.round((info.BitRate / 1000).toFixed(0))
            const audio = `[font=Consolas][size=3][color=#4c838b]A[/color][color=#528c8f]u[/color][color=#589493]d[/color][color=#5f9d97]i[/color][color=#65a59c]o[/color][color=#6baea0]▸[/color][color=#71b6a4]${
              info['@typeorder'] ? info['@typeorder'] : '1'
            }[/color][/size] [color=#4c838b]⋄[/color][/font]
[size=2][font=Consolas]Format.........: ${info.Format} ${
              info.Format_AdditionalFeatures
                ? info.Format_AdditionalFeatures
                : ''
            }
Channels.......: ${info.Channels} ${info.Channels > 1 ? 'Channels' : 'Channel'}
Bit rate.......: ${audioBitrateKb} kb/s
Language.......: ${getLanguage(info.Language)}${
              info.Title ? `\nTitle..........: ${info.Title}` : ''
            }[/font][/size]
            `
            allInfo += audio + '\n'
          }

          if (info['@type'] === 'Text') {
            langArr[info['@typeorder'] - 1] = `${
              info.Title
                ? `${getLanguage(info.Language)} (${info.Title})`
                : `${getLanguage(info.Language)}`
            }`
            if (index === mainArrLength) {
              const subs = `[size=3][font=Consolas][color=#4c838b]S[/color][color=#51898e]u[/color][color=#559091]b[/color][color=#5a9694]t[/color][color=#5f9d98]i[/color][color=#63a39b]t[/color][color=#68a99e]l[/color][color=#6cb0a1]e[/color][color=#71b6a4]s[/color][/size] [color=#4c838b]⋄[/color][/font]
[size=2][font=Consolas]Format.........: PGS (Original)
Language.......: ${langArr.map((sLang, index) =>
                index > 0 ? ' ' + sLang : sLang
              )}[/font][/size]
            `
              allInfo += subs + '\n'
            }
          }
          document.getElementById('obox').value = allInfo
        })}
      </div>
    </>
  )
}

export default App
