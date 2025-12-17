import { useState } from 'react'
import './App.css'

const initialForm = { title: '', director: '', year: '', review: '', rating: '' }

export default function AddMovieForm({ onCreate, savingId }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.title || !form.title.trim()) e.title = 'Title is required.'
    if (!form.director || !form.director.trim()) e.director = 'Director is required.'
    if (!form.year) e.year = 'Year is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    if (onCreate) await onCreate({ ...form, year: Number(form.year) })
    setForm(initialForm)
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <label className="field">
          <span>Title</span>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Past Lives"
          />
          {errors.title && <small className="error">{errors.title}</small>}
        </label>
        <label className="field">
          <span>Director</span>
          <input
            type="text"
            value={form.director}
            onChange={(e) => setForm({ ...form, director: e.target.value })}
            placeholder="Celine Song"
          />
          {errors.director && <small className="error">{errors.director}</small>}
        </label>
        <label className="field">
          <span>Year</span>
          <input
            type="number"
            value={form.year}
            min="1888"
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            placeholder="2023"
          />
          {errors.year && <small className="error">{errors.year}</small>}
        </label>
        <label className="field">
          <span>Rating (0-10)</span>
          <input
            type="number"
            value={form.rating}
            min="0"
            max="10"
            step="0.5"
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            placeholder="8.5"
          />
        </label>
      </div>
      <label className="field">
        <span>Quick review or note</span>
        <textarea
          rows="3"
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          placeholder="What should reviewers focus on?"
        />
      </label>
      <button className="primary" type="submit" disabled={!!savingId}>
        {savingId === 'new' ? 'Saving…' : 'Add to backlog'}
      </button>
    </form>
  )
}
