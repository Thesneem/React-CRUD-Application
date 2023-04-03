import React from 'react'
import Header from '../UserHeader/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

// import { Link, useNavigate } from 'react-router-dom'

function Home() {
    // const navigate = useNavigate()
    return (
        <div className="homepage">
            <Header />
            <div className="container">
                <div className="row">
                    <h1>Latest blogs on React</h1>
                    <div className="col-md-3 mr-6 mt-5 ">

                        <div class="col-md-12">
                            <h2>Ibrahima Ndaw's Blog</h2>
                            <img class="overflow-none img-fluid max-width-100%" src="https://storage.googleapis.com/bloggingfordevs.appspot.com/blogs/poaAPIvgx/screenshots/main-9fVsJi2F2-m.png" alt="image1" />
                            <Link to='https://bloggingfordevs.com/react-blogs/'>  <p class="text-dark mt-3 px-2">
                                Ibrahima writes about frontend and backend development with JavaScript and Node JS. He covers topics related to React, GraphQL, Unit Testing, and TypeScript. Ibrahima publishes beginner to advanced topics and tries to simplify the broad terms as much as possible. He is currently writing about Next.js and TypeScript.
                            </p>
                            </Link>
                        </div>

                    </div>
                    <div className="col-md-3 mr-6 mt-5 ">

                        <div class="col-md-12">
                            <h2>Josh W. Comeau's Blog</h2>
                            <img class="overflow-none img-fluid max-width-100%" src="https://storage.googleapis.com/bloggingfordevs.appspot.com/blogs/6a04395f5964b1aad18255e0eb091e64/screenshots/main-9fHfW6VmR-m.png" alt="image1" />
                            <p class="text-dark mt-3 px-2">
                                Josh writes playful and interactive articles with a focus on React, Gatsby, CSS, and animation. Formerly employed by Gatsby, he recently went full-time to work on an interactive CSS course, built on his own course software.</p>
                        </div>

                    </div>
                    <div className="col-md-3 mr-6 mt-5 ">

                        <div class="col-md-12">
                            <h2>Kent C. Dodds' Blog</h2>
                            <img class="overflow-none img-fluid max-width-100%" src="https://storage.googleapis.com/bloggingfordevs.appspot.com/blogs/86c3aa0d51697599c6a91282f5896f08/screenshots/main-9fHfW77VF-m.png" alt="image1" />
                            <p class="text-dark mt-3 px-2">
                                Kent C. Dodds writes about React, JavaScript, and Node.js. He's particularly written a lot about testing with Jest and Cypress. Formerly employed by PayPal, he now creates educational material full-time for web developers.
                            </p>
                        </div>

                    </div>
                    <div className="col-md-3 mr-6 mt-5 ">

                        <div class="col-md-12">
                            <h2>Mark's Dev Blog</h2>
                            <img class="overflow-none img-fluid max-width-100%" src="https://storage.googleapis.com/bloggingfordevs.appspot.com/blogs/eIZnv8InZ/screenshots/main-9fHfW78GL-m.png" alt="image1" />
                            <p class="text-dark mt-3 px-2">
                                Mark writes detailed technical articles focused on React and Redux, as well as introductory articles on web development topics, tips for coding career advice, React/Redux-related presentations and assorted other technical topics (TypeScript, Git, etc). The author is also a maintainer of Redux.                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}

export default Home