import { useState, useEffect } from 'preact/hooks'
// import './app.css'
import axios from 'axios';


export function App() {

  type Card = {
    id: number,
    title: string,
    image: string,
    text: string
  }

  let randomize = Math.floor(Math.random() * 500)

  const [isDisplayed, setIsDisplayed] = useState(false)
  const [posts, setPosts] = useState<Card[]>([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateText, setUpdateText] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3004/cards')
    .then(({ data }) => {
      console.log(data)
      setPosts(data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const postDelete = (id: number) => {
    axios
    .delete(`http://localhost:3004/cards/${id}`)
    .then(({ data }) => {
      axios
      .get('http://localhost:3004/cards')
      .then(({ data }) => {
      console.log(data)
      setPosts(data)
    })
    .catch(error => {
      console.log(error)
    })
    })
    .catch(error => {
      console.log(error)
    })
  }

  const postAdd = (e: any) => {
    e.preventDefault()
    axios
    .post('http://localhost:3004/cards/', {
      title,
      text,
      image: `https://picsum.photos/id/${randomize}/200`
    })
    .then(({ data }) => { 
    axios
    .get('http://localhost:3004/cards')
    .then(({ data }) => {
      console.log(data)
      setPosts(data)
    })
    .catch(error => {
      console.log(error)
    })
    })
    .catch(error => {
      console.log(error)
    })
  }
 
  const postUpdate = (e: any) => {
    e.preventDefault()
    axios
    .put('http://localhost:3004/cards/', {
      title,
      text,
      image: `https://picsum.photos/id/${randomize}/200`
    })
    .then(({ data }) => { 
    })
    .catch(error => {
      console.log(error)
    })
  }
  

  return (
    <>
      <section className="main__section sec-position">
        <div className="main__wrapper">
        {posts.map((post) => {
        return (
          <div className="card">
              <div className="img__section">
                  <img src={post.image}></img>
              </div>
              <div className="text__section">
                  <h4 className="title">{post.title}</h4>
                  <p className="text">{post.text}</p>
              </div>
              <div className="btn__section">
              <button className="edit__btn"
              onClick={() => {
                setIsDisplayed (!isDisplayed)
              }}>
              EDIT
              </button>             
              <button className="delete__btn"
               onClick={() => {
                postDelete(post.id)
                console.log(post.id)
                }}>
                DELETE
                  </button>
              </div>
              <form className={`update-form hidden ${isDisplayed && 'active'}`}>
                <label className={`card__label  hidden ${isDisplayed && 'active'}`}>Title</label>
                <input type="text" 
                className={`updated__title  hidden ${isDisplayed && 'active'}`}
                required 
                value={title} 
                onChange={(e) => setUpdateTitle((e.target as HTMLTextAreaElement).value)}/>
                <label className={`text__label  hidden ${isDisplayed && 'active'}`}>Text</label>
                <textarea 
                className={`updated__text  hidden ${isDisplayed && 'active'}`}
                required 
                value={text} 
                onChange={(e) => setUpdateText((e.target as HTMLTextAreaElement).value)}></textarea>
                <button 
                className={`update__btn  hidden ${isDisplayed && 'active'}`}
                onClick={postUpdate}>
                UPDATE</button>
              </form>
          </div>
      )
      })}
        </div>
    </section>
    <section className="input__section sec-position">
        <div className="input__wrapper ">
            <span>Add new</span>
            <form className="form">
                <label className="input__label"> Title
                    <br />
                    <input
                    type="text" 
                    className="input__title" 
                    required 
                    value={title} 
                    onChange={(e) => setTitle((e.target as HTMLTextAreaElement).value)}/>
                    <br />
                    Text
                    <br />
                    <textarea 
                    className="js-add-text" 
                    required value={text} 
                    onChange={(e) => setText((e.target as HTMLTextAreaElement).value)}>
                    </textarea>
                    <br />
                    <button className="add__button"
                    onClick={postAdd}>
                    Add</button> 
                </label>
            </form>
            </div>
    </section>
    </>
  )
}
