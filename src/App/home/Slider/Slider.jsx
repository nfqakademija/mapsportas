import React from 'react';
import { Link } from 'react-router-dom';

const slide1 = {
    backgroundImage: `url(img/bg-img/bg-1.jpg)`
};

const slide2 = {
    backgroundImage: `url(img/bg-img/bg-2.jpg)`
};

const slide3 = {
    backgroundImage: `url(img/bg-img/bg-3.jpg)`
};

const Slider = () => (

    <div id="carouselExampleIndicators" className="carousel slide my-slider" data-ride="carousel">
        <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
            <div className="carousel-item my-carousel-item active" style={slide1}>
                <div className="my-caption d-md-block">
                    <h3>Nori sportuoti, bet nežinai kur?</h3>
                    <p>Rask sau tinkamiausią vietą!</p>
                    <Link className="btn my-btn" to="/venues">Ieškoti</Link>
                </div>
            </div>
            <div className="carousel-item my-carousel-item" style={slide2}>
                <div className="my-caption d-md-block">
                    <h3>Nori sportuoti, bet neturi su kuo?</h3>
                    <p>Prisijunk prie kitų!</p>
                    <Link className="btn my-btn" to="/events">Jungtis</Link>
                </div>
            </div>
            <div className="carousel-item my-carousel-item" style={slide3}>
                <div className="my-caption d-md-block">
                    <h3>Nieko nerandi?</h3>
                    <p>Suorganizuok tai, ko nori!</p>
                    <Link className="btn my-btn" to="/event/create">Sukurti</Link>
                </div>
            </div>
        </div>
        <a className="prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            Previous
        </a>
        <a className="next" href="#carouselExampleIndicators" role="button" data-slide="next">
            Next
        </a>
    </div>

);

export default Slider;