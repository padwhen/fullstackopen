import { useEffect, useState } from "react"
import { createNewDiary, getAllDiaries } from "./noteService"
import { DiaryEntry, Visibility, Weather } from './types'
import './App.css'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>()
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [comment, setComment] = useState<string>('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createNewDiary({date, visibility, weather, comment}).then(data => {
      setDiaries(diaries?.concat(data))
    })
  }
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])
  const Component = ({date, visibility, weather}: DiaryEntry) => {
    return (
      <div>
        <h2>{date}</h2>
        <div>
          visibility: {visibility}
        </div>
        <div>
          weather: {weather}
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        date: <input type='date' value={date} onChange={(event) => setDate(event.target.value)} />
        visibility:
        {["great", "good", "ok", "poor"].map((value) => (
          <label key={value}>
            <input type="radio" value={value} checked={visibility === value} onChange={() => setVisibility(value as Visibility)} />
            {value}
          </label>
        ))}
        weather:
        {["sunny", "rainy", "cloudy", "stormy", "windy"].map((value) => (
          <label key={value}>
            <input type="radio" value={value} checked={weather === value} onChange={() => setWeather(value as Weather)} />
            {value}
          </label>
        ))}
        comment: <input value={comment} onChange={(event) => setComment(event.target.value)} />
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries && diaries.map((diary) => {
        return (
          <Component key={diary.id} {...diary} />
        )
      })}
    </div>
  )
}

export default App