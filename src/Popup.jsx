import s from './App.module.sass'

export function Popup({ close, header }) {
  return (
    <>
      <div className={s.dim} onClick={close} />
      <div className={s.popup}>
        <div className={s.header}>{header}</div>
        <div className={s.content}>
          <p>
            Данное приложение разработано в рамках учебной дисциплины "Общая
            теория интеллектуальных систем" для быстрого и удобного построения
            модели состава системы.
          </p>
          <br />
          <p>
            <code>Tab</code> для перехода на следующий блок
          </p>
          <p>
            <code>Shift + Enter</code> для перехода на предыдущий блок
          </p>
          <p>
            <code>Enter</code> для добавления соседнего блока
          </p>
          <p>
            <code>Shift + Enter</code> для добавления дочернего блока
          </p>
          <br />
          <p>
            <em>2022, Шарапов А. С.</em>
          </p>
        </div>
      </div>
    </>
  )
}
