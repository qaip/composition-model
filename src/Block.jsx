import { useEffect, useRef } from "react"
import s from './App.module.sass'
import { LEVELS, SUB_LEVELS } from './constants'

export function Block({
  data: { value, level, children, _key },
  onChange,
  onNewItem,
  remove,
  autofocus,
  setAutofocus,
  isCompactMode,
}) {
  const inputRef = useRef()

  useEffect(() => {
    if (autofocus) inputRef.current.focus()
  }, [])

  const levels = isCompactMode ? SUB_LEVELS : LEVELS

  const keyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        if (level >= levels.length) return
        if (!value && level > 1) {
          onChange({
            _key,
            value,
            level: level + 1,
            children,
          })
        } else if (value) {
          e.target.blur()
          onChange({
            _key,
            value,
            level,
            children: children.concat({
              _key: Date.now(),
              value: '',
              level: level + 1,
              children: [],
            }),
          })
        }
      } else if (value) {
        onNewItem({
          _key: Date.now(),
          value: '',
          level: level,
          children: [],
        })
      }
    }
  }

  const onBlur = () => {
    if (!value) remove()
  }

  return (
    <div className={s.block}>
      {!isCompactMode && levels[level - 1] ? (
        <div className={s.label}>{levels[level - 1]}</div>
      ) : null}
      <input
        ref={inputRef}
        className={s.input}
        value={value}
        onChange={(e) => onChange({ _key, value: e.target.value, level, children })}
        onKeyDown={keyDown}
        onBlur={onBlur}
        onFocus={setAutofocus}
      />
      {isCompactMode && children.length && levels[level] ? (
        <div className={s.label}>{levels[level]}:</div>
      ) : null}
      <div className={s.children}>
        {children.map((child, index) => (
          <Block
            key={child._key ?? 0}
            data={child}
            onChange={(changedChild) => {
              children.splice(index, 1, changedChild)
              onChange({ _key, value, level, children })
            }}
            onNewItem={(newChild) => {
              children.splice(index + 1, 0, newChild)
              onChange({ _key, value, level, children })
            }}
            remove={() => {
              children.splice(index, 1)
              onChange({ _key, value, level, children })
            }}
            autofocus={autofocus}
            setAutofocus={setAutofocus}
            isCompactMode={isCompactMode}
          />
        ))}
      </div>
    </div>
  )
}
