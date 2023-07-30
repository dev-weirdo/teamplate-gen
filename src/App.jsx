import { useState } from 'react'
import './Button.css'

function App () {
  const [checked, setChecked] = useState(false)
  let allInfo = ''
  let mainArrLength = 0
  let chapter = true

  const handleChecked = () => {
    setChecked(current => !current)
  }

  //Languages array and divide into category
  const langArr = []
  langArr[0] = new Array()
  langArr[1] = new Array()
  langArr[2] = new Array()
  langArr[3] = new Array()

  //Convert language iso code to language name
  const getLanguage = fLang => {
    const fullLang = new Intl.DisplayNames(['en'], { type: 'language' })
    return fullLang.of(fLang)
  }

  //set username to local storage

  const setUsername = () => {
    const userName = document.querySelector('#username').value
    localStorage.setItem('username', String(userName))
  }

  //Convert seconds to h-m-s
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

  //Get date
  const d = new Date()
  const date = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  const dateStr = date < 10 ? '0' + date : date
  const monthStr = month < 10 ? '0' + month : month
  const fullDateStr = dateStr + '/' + monthStr + '/' + year

  //Execute on generate button click
  const generate = () => {
    const getUserJson = document.querySelector('#ibox').value
    const parsedValue = JSON.parse(getUserJson)
    const mediaInfo = parsedValue?.media?.track
    //Check if Menu section is available
    mediaInfo.map(info => {
      if (info['@type'] === 'Menu') {
        chapter = true
        mainArrLength = mediaInfo.length - 2
      } else {
        chapter = false
        mainArrLength = mediaInfo.length - 1
      }
    })

    mediaInfo.map((info, index) => {
      if (info['@type'] === 'General') {
        const fileGibSize = info.FileSize / 1073741824
        const fileMibSize = (info.FileSize / 1048576).toFixed()
        const general = `[font=Consolas][size=3][color=#4c838b]G[/color][color=#518a8f]e[/color][color=#579292]n[/color][color=#5c9996]e[/color][color=#61a099]r[/color][color=#66a79d]a[/color][color=#6cafa0]l[/color] [/size] [color=#4c838b]⋄[/color]  [/font]
[size=2][font=Consolas]Filename.......: ${parsedValue.media['@ref']
          .split('\\')
          .pop()}
Container......: ${info.Format}
Duration.......: ${convertHMS(info.Duration)}
Size...........: ${
          fileGibSize >= 10
            ? fileGibSize.toFixed(1)
            : fileGibSize >= 1
            ? fileGibSize.toFixed(2)
            : fileMibSize
        } ${fileGibSize >= 1 ? 'GiB' : 'MiB'}
Chapters.......: ${chapter ? 'Yes (Numbered)' : 'No'}
${
  checked ? 'Encoder........' : 'Remuxer........'
}: [color=#3c758f]${localStorage.getItem(
          'username'
        )}[/color][color=#2683cc]@[/color][color=#3e669c]⋿[/color][color=#3d5692]✗[/color][color=#379ac3]t[/color][color=#389bc7]e[/color][color=#3a9bcb]r[/color][color=#3c9cce]m[/color][color=#3e9dd2]i[/color][color=#409dd6]n[/color][color=#429eda]a[/color][color=#439fdd]t[/color][color=#459fe1]o[/color][color=#47a0e5]r[/color]
Release Date...: ${fullDateStr}[/font][/size]
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
        }${info.Format_Tier ? '@' + info.Format_Tier : ''} ${info.BitDepth} bits
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
          info.Format_AdditionalFeatures ? info.Format_AdditionalFeatures : ''
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
        if (info.Format === 'PGS') {
          langArr[0].push(
            `${
              info.Title
                ? `${getLanguage(info.Language)} (${info.Title})`
                : `${getLanguage(info.Language)}`
            }`
          )
        }
        if (info.Format === 'UTF-8') {
          langArr[1].push(
            `${
              info.Title
                ? `${getLanguage(info.Language)} (${info.Title})`
                : `${getLanguage(info.Language)}`
            }`
          )
        }
        if (info.Format === 'VobSub') {
          langArr[2].push(
            `${
              info.Title
                ? `${getLanguage(info.Language)} (${info.Title})`
                : `${getLanguage(info.Language)}`
            }`
          )
        }
        if (info.Format === 'ASS') {
          langArr[3].push(
            `${
              info.Title
                ? `${getLanguage(info.Language)} (${info.Title})`
                : `${getLanguage(info.Language)}`
            }`
          )
        }
        if (index === mainArrLength) {
          const subs = `${`[size=3][font=Consolas][color=#4c838b]S[/color][color=#51898e]u[/color][color=#559091]b[/color][color=#5a9694]t[/color][color=#5f9d98]i[/color][color=#63a39b]t[/color][color=#68a99e]l[/color][color=#6cb0a1]e[/color][color=#71b6a4]s[/color][/size] [color=#4c838b]⋄[/color][/font]
[size=2][font=Consolas]${
            langArr[0].length !== 0
              ? `Format.........: PGS (Original)
Language.......: ${langArr[0].map((sLang, index) =>
                  index > 0 ? ' ' + sLang : sLang
                )}\n
`
              : ''
          }${
            langArr[1].length !== 0
              ? `Format.........: UTF-8
Language.......: ${langArr[1].map((sLang, index) =>
                  index > 0 ? ' ' + sLang : sLang
                )}\n
`
              : ''
          }${
            langArr[2].length !== 0
              ? `Format.........: VobSub (Original)
Language.......: ${langArr[2].map((sLang, index) =>
                  index > 0 ? ' ' + sLang : sLang
                )}\n
`
              : ''
          }${
            langArr[3].length !== 0
              ? `Format.........: ASS
Language.......: ${langArr[3].map((sLang, index) =>
                  index > 0 ? ' ' + sLang : sLang
                )}\n
`
              : ''
          }
[/font][/size]
                        `}`
          allInfo += subs + '\n'
        }
      }
      document.getElementById('obox').value = allInfo
    })
  }
  return (
    <>
      <div className='bg-[#212328] font-consolas text-white flex flex-col items-center justify-center gap-5 p-5'>
        <h1 className='text-xl md:text-2xl lg:text-3xl py-12'>
          <span style={{ color: '#205f90' }}>e</span>
          <span style={{ color: '#216894' }}>X</span>
          <span style={{ color: '#237197' }}>t</span>
          <span style={{ color: '#247a9b' }}>e</span>
          <span style={{ color: '#25839e' }}>r</span>
          <span style={{ color: '#278ca2' }}>m</span>
          <span style={{ color: '#2895a5' }}>i</span>
          <span style={{ color: '#359dab' }}>n</span>
          <span style={{ color: '#42a6b0' }}>a</span>
          <span style={{ color: '#50aeb6' }}>t</span>
          <span style={{ color: '#5db6bc' }}>o</span>
          <span style={{ color: '#6abfc1' }}>r</span>
          <span style={{ color: '#77c7c7' }}> </span>
          <span style={{ color: '#7ec7c6' }}>T</span>
          <span style={{ color: '#84c8c4' }}>e</span>
          <span style={{ color: '#8bc8c3' }}>m</span>
          <span style={{ color: '#92c8c1' }}>p</span>
          <span style={{ color: '#98c9c0' }}>l</span>
          <span style={{ color: '#9fc9be' }}>a</span>
          <span style={{ color: '#8bc0ba' }}>t</span>
          <span style={{ color: '#77b8b6' }}>e</span>
          <span style={{ color: '#64afb2' }}> </span>
          <span style={{ color: '#50a6ad' }}>G</span>
          <span style={{ color: '#3c9ea9' }}>e</span>
          <span style={{ color: '#2895a5' }}>n</span>
          <span style={{ color: '#278ca2' }}>e</span>
          <span style={{ color: '#25839e' }}>r</span>
          <span style={{ color: '#247a9b' }}>a</span>
          <span style={{ color: '#237197' }}>t</span>
          <span style={{ color: '#216894' }}>o</span>
          <span style={{ color: '#205f90' }}>r</span>
        </h1>
        <input
          className='bg-[#2C3E50] text-center border border-white px-2 py-3 w-80'
          type='text'
          id='username'
          placeholder='Put TBD Username here'
          defaultValue={
            localStorage.getItem('username') && localStorage.getItem('username')
          }
        />

        <button
          onClick={setUsername}
          className='border px-4 py-2 border-[#01579b] text-lg rounded-md'
        >
          {localStorage.getItem('username')
            ? 'Update Username'
            : 'Set Username'}
        </button>
        <div>
          <div className='flex justify-center items-center'>
            <div className='toggler'>
              <input
                id='toggler-1'
                name='toggler-1'
                onChange={handleChecked}
                type='checkbox'
                value={checked}
              />
              <label htmlFor='toggler-1'>
                <svg
                  className='toggler-on'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 130.2 130.2'
                >
                  <polyline
                    className='path check'
                    points='100.2,40.2 51.5,88.8 29.8,67.5'
                  ></polyline>
                </svg>
                <svg
                  className='toggler-off'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 130.2 130.2'
                >
                  <line
                    className='path line'
                    x1='34.4'
                    y1='34.4'
                    x2='95.8'
                    y2='95.8'
                  ></line>
                  <line
                    className='path line'
                    x1='95.8'
                    y1='34.4'
                    x2='34.4'
                    y2='95.8'
                  ></line>
                </svg>
              </label>
            </div>
            <h1 className='text-xl font-semibold tracking-wider'>Encoder</h1>
          </div>
          <textarea
            className='bg-[#2C3E50] p-5 rounded w-full'
            name='inputbox'
            id='ibox'
            cols='130'
            rows='20'
            placeholder='Paste your Mediainfo JSON here...'
          ></textarea>
        </div>
        <button
          className='border px-4 py-2 border-[#01579b] text-lg rounded-md'
          onClick={generate}
        >
          Generate
        </button>
        <div>
          <h1 className='text-lg md:text-2xl py-3 font-semibold tracking-widest'>
            <span style={{ color: '#205f90' }}>O</span>
            <span style={{ color: '#2895a5' }}>u</span>
            <span style={{ color: '#77c7c7' }}>t</span>
            <span style={{ color: '#8bc8c3' }}>p</span>
            <span style={{ color: '#9fc9be' }}>u</span>
            <span style={{ color: '#2895a5' }}>t</span>
            <span style={{ color: '#205f90' }}>:</span>
          </h1>
          <textarea
            name='outputbox'
            id='obox'
            cols='130'
            rows='20'
            className='bg-[#2C3E50] p-5 rounded w-full'
          ></textarea>
        </div>

        <footer className='py-4'>
          <p>
            <span style={{ color: '#205f90' }}>&#169;</span>
            <span style={{ color: '#216793' }}>{year}</span>
            <span style={{ color: '#226e96' }}> </span>
            <span style={{ color: '#237699' }}>S</span>
            <span style={{ color: '#257e9c' }}>I</span>
            <span style={{ color: '#26869f' }}>U</span>
            <span style={{ color: '#278da2' }}>U</span>
            <span style={{ color: '#2895a5' }}>U</span>
            <span style={{ color: '#339caa' }}>@</span>
            <span style={{ color: '#3fa3af' }}>e</span>
            <span style={{ color: '#4aaab4' }}>X</span>
            <span style={{ color: '#55b2b8' }}>t</span>
            <span style={{ color: '#60b9bd' }}>e</span>
            <span style={{ color: '#6cc0c2' }}>r</span>
            <span style={{ color: '#77c7c7' }}>m</span>
            <span style={{ color: '#7ec7c6' }}>i</span>
            <span style={{ color: '#84c8c4' }}>n</span>
            <span style={{ color: '#8bc8c3' }}>a</span>
            <span style={{ color: '#92c8c1' }}>t</span>
            <span style={{ color: '#98c9c0' }}>o</span>
            <span style={{ color: '#9fc9be' }}>r</span>
            <span style={{ color: '#8ec2ba' }}>.</span>
            <span style={{ color: '#7dbab7' }}> </span>
            <span style={{ color: '#6cb3b3' }}>M</span>
            <span style={{ color: '#5babb0' }}>a</span>
            <span style={{ color: '#4aa4ac' }}>d</span>
            <span style={{ color: '#399ca9' }}>e</span>
            <span style={{ color: '#2895a5' }}> </span>
            <span style={{ color: '#278da2' }}>w</span>
            <span style={{ color: '#26869f' }}>i</span>
            <span style={{ color: '#257e9c' }}>t</span>
            <span style={{ color: '#237699' }}>h</span>
            <span style={{ color: '#226e96' }}> </span>
            <span style={{ color: '#216793' }}>&#x2764;</span>
          </p>
        </footer>
      </div>
    </>
  )
}

export default App