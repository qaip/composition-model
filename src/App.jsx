import { useEffect, useState } from 'react'
import s from './App.module.sass'
import { Block } from './Block'
import { ABOUT_HEADER, LEVELS, SUB_LEVELS } from './constants'
import { Popup } from './Popup'

function App() {
  const [data, setData] = useState()
  const [theme, setTheme] = useState()
  const [isCompactMode, setIsCompactMode] = useState()
  const [autofocus, setAutofocus] = useState('text')
  const [showAbout, setShowAbout] = useState(true)

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? 'light')
    setIsCompactMode(JSON.parse(localStorage.getItem("isCompactMode")) ?? false)
    setData(JSON.parse(localStorage.getItem("data")) ?? {
      value: 'Принтер',
      level: 1,
      children: [],
    })
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const toggleIsCompactMode = () => {
    const newIsCompactMode = !isCompactMode
    setIsCompactMode(newIsCompactMode)
    localStorage.setItem("isCompactMode", JSON.stringify(newIsCompactMode))
  }

  const changeData = (newData) => {
    setData(newData)
    localStorage.setItem("data", JSON.stringify(newData))
  }

  if (!theme) return <></>
  return (
    <div className={`${s.app} ${s[theme]}`}>
      {showAbout && (
        <Popup close={() => setShowAbout(false)} header={ABOUT_HEADER} />
      )}

      <header>
        <div className={s.header}>Модель состава</div>
        <div className={s.buttons}>
          <div onClick={toggleIsCompactMode}>
            {isCompactMode ? 'Компактное описание' : 'Детальное описание'}
          </div>
          <div className={s.theme} onClick={toggleTheme}>
            <div />
          </div>
          <div onClick={() => setShowAbout(true)}>{ABOUT_HEADER}</div>
        </div>
      </header>

      <div className={s.section}>
        <div className={s.source}>
          {isCompactMode && (
            <div className={s.label}>
              {(isCompactMode ? SUB_LEVELS : LEVELS)[0]}:
            </div>
          )}
          <Block
            data={data}
            onChange={changeData}
            onNewItem={() => {}}
            remove={() => {}}
            autofocus={autofocus === 'text'}
            setAutofocus={() => setAutofocus('text')}
            isCompactMode={isCompactMode}
          />
        </div>

        <div className={s.visualization}>
          <Block
            data={data}
            onChange={changeData}
            onNewItem={() => {}}
            remove={() => {}}
            autofocus={autofocus === 'visual'}
            setAutofocus={() => setAutofocus('visual')}
            isCompactMode={isCompactMode}
          />
        </div>
      </div>
    </div>
  )
}

export default App
