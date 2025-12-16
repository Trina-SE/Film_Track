import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const initialForm = { title: '', director: '', year: '', review: '', rating: '' };

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [savingId, setSavingId] = useState('');
  const [filter, setFilter] = useState('all');
  const [showStats, setShowStats] = useState(false);

  async function request(path, options = {}) {
    setError('');
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || 'Unexpected error');
    }

    if (res.status === 204) return null;
    return res.json();
  }

  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await request('/api/movies');
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  async function handleCreate(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.director.trim() || !form.year) {
      setError('Please fill title, director, and year.');
      return;
    }
    setSavingId('new');
    try {
      const body = {
        ...form,
        year: Number(form.year),
        watched: false,
      };
      const created = await request('/api/movies', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      setMovies((prev) => [created, ...prev]);
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId('');
    }
  }

  async function toggleWatched(movie) {
    setSavingId(movie._id);
    try {
      const updated = await request(`/api/movies/${movie._id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...movie, watched: !movie.watched }),
      });
      setMovies((prev) =>
        prev.map((m) => (m._id === movie._id ? updated : m))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId('');
    }
  }

  async function handleDelete(id) {
    const movie = movies.find((m) => m._id === id);
    if (!movie) return;
    setSavingId(id);
    try {
      await request(`/api/movies/${id}`, { method: 'DELETE' });
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId('');
    }
  }

  const filtered = useMemo(() => {
    if (filter === 'watched') return movies.filter((m) => m.watched);
    if (filter === 'backlog') return movies.filter((m) => !m.watched);
    return movies;
  }, [filter, movies]);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">FilmTrack</p>
          <h1>A simple movie tracker</h1>
          <p className="lede">
            Track movies you love, add quick reviews, and easily mark movies as watched or in your backlog
          </p>
          <div className="hero-actions">
            {/*<span className="badge">Enjoy your Time</span>*/}
            <button className="ghost" onClick={loadMovies} disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh data'}
            </button>
            <button className="stats-btn" onClick={() => setShowStats(!showStats)}>
              📊 {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>
      </header>

      {showStats && (
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{movies.length}</div>
              <div className="stat-label">Total Movies</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{movies.filter(m => m.watched).length}</div>
              <div className="stat-label">Watched</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{movies.filter(m => !m.watched).length}</div>
              <div className="stat-label">In Backlog</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {movies.length > 0 ? (movies.filter(m => m.rating).reduce((sum, m) => sum + (m.rating || 0), 0) / movies.filter(m => m.rating).length).toFixed(1) : '0.0'}
              </div>
              <div className="stat-label">Avg Rating</div>
            </div>
          </div>
        </section>
      )}

      <main className="layout">
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">New entry</p>
              <h2>Add a movie for review</h2>
            </div>
            {error && <span className="error">{error}</span>}
          </div>

          <form className="stack" onSubmit={handleCreate}>
            <div className="field-grid">
              <label className="field">
                <span>Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Past Lives"
                />
              </label>
              <label className="field">
                <span>Director</span>
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) =>
                    setForm({ ...form, director: e.target.value })
                  }
                  placeholder="Celine Song"
                />
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
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Backlog</p>
              <h2>Movies to track</h2>
            </div>
            <div className="filters">
              {['all', 'backlog', 'watched'].map((key) => (
                <button
                  key={key}
                  type="button"
                  className={filter === key ? 'chip active' : 'chip'}
                  onClick={() => setFilter(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className="hint">Loading movies…</p>}
          {!loading && filtered.length === 0 && (
            <p className="hint">No movies yet. Add one to get started.</p>
          )}

          <div className="list">
            {filtered.map((movie) => (
              <article key={movie._id} className="card">
                <div className="card-head">
                  <div>
                    <p className="eyebrow">{movie.year}</p>
                    <h3>{movie.title}</h3>
                    <p className="meta">Directed by {movie.director}</p>
                  </div>
                  <span
                    className={movie.watched ? 'pill success' : 'pill warning'}
                  >
                    {movie.watched ? 'Watched' : 'Backlog'}
                  </span>
                </div>
                {movie.review && (
                  <p className="review">“{movie.review.trim()}”</p>
                )}                {movie.rating && (
                  <p className="rating">⭐ Rating: {movie.rating}/10</p>
                )}                <div className="actions">
                  <button
                    type="button"
                    className="ghost"
                    disabled={savingId === movie._id}
                    onClick={() => toggleWatched(movie)}
                  >
                    {movie.watched ? 'Mark backlog' : 'Mark watched'}
                  </button>
                  <button
                    type="button"
                    className="danger"
                    disabled={savingId === movie._id}
                    onClick={() => handleDelete(movie._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
