import { useState, useEffect } from 'react';
import './style.css';

function TestGhibli() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener películas y personajes de la API
        const moviesResponse = await fetch('https://ghibliapi.dev/films');
        const movies = await moviesResponse.json();
        
        // Crear preguntas basadas en las películas
        const generatedQuestions = movies.slice(0, 5).map(movie => {
          // Pregunta sobre el director
          const directorQuestion = {
            type: 'director',
            question: `¿Quién dirigió "${movie.title}"?`,
            image: movie.image,
            options: [
              movie.director,
              'Hayao Miyazaki', // Opción común para confundir
              'Isao Takahata',
              'Gorō Miyazaki'
            ].sort(() => Math.random() - 0.5), // Mezclar opciones
            correctAnswer: movie.director,
            movieTitle: movie.title
          };

          // Pregunta sobre el año
          const yearQuestion = {
            type: 'year',
            question: `¿En qué año se estrenó "${movie.title}"?`,
            image: movie.image,
            options: [
              movie.release_date.split('-')[0],
              (parseInt(movie.release_date.split('-')[0]) + 2).toString(),
              (parseInt(movie.release_date.split('-')[0]) - 3).toString(),
              (parseInt(movie.release_date.split('-')[0]) + 5).toString()
            ].sort(() => Math.random() - 0.5),
            correctAnswer: movie.release_date.split('-')[0],
            movieTitle: movie.title
          };

          return [directorQuestion, yearQuestion];
        }).flat();

        setQuestions(generatedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  if (loading) {
    return <div className="quiz-loading">Cargando magia Ghibli... ✨</div>;
  }

  return (
    <div className="quiz-container">
      <h2>Test Ghibli 🎬</h2>
      <p className="subtitle">Demuestra cuánto sabes sobre las películas</p>
      
      {!showResult && questions.length > 0 ? (
        <div className="question-card">
          <div className="movie-header">
            <h3 className="movie-title">{questions[currentQuestion].movieTitle}</h3>
            <div className="question-progress">
              Pregunta {currentQuestion + 1}/{questions.length}
            </div>
          </div>
          
          <div className="movie-image-container">
            <img 
              src={questions[currentQuestion].image || 'https://via.placeholder.com/300x200?text=Studio+Ghibli'} 
              alt={questions[currentQuestion].movieTitle} 
              className="movie-image"
            />
          </div>
          
          <h3 className="question-text">{questions[currentQuestion].question}</h3>
          
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedOption !== null && 
                  option === questions[currentQuestion].correctAnswer 
                    ? 'correct' 
                    : ''
                } ${
                  selectedOption === option && 
                  option !== questions[currentQuestion].correctAnswer 
                    ? 'wrong' 
                    : ''
                }`}
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : showResult ? (
        <div className="result-card">
          <h3>¡Resultados Finales!</h3>
          <div className="score-display">
            <p className="score-text">
              Obtuviste <span className="score-number">{score}</span> de <span className="score-total">{questions.length}</span> correctas
            </p>
            <div className="score-bar">
              <div 
                className="score-progress" 
                style={{ width: `${(score / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <button className="restart-btn" onClick={restartQuiz}>
            ⏮️ Volver a Jugar
          </button>
        </div>
      ) : (
        <p>No se pudieron cargar las preguntas</p>
      )}
      
      <div className="ghibli-fact">
        <p>💡 Sabías que: Studio Ghibli fue fundado en 1985 por Hayao Miyazaki, Isao Takahata y Toshio Suzuki</p>
      </div>
    </div>
  );
}

export default TestGhibli;