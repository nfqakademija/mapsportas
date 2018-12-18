import React from 'react';
import PrimaryButton from "../../components/buttons/PrimaryButton";

const slide1 = {
    backgroundImage: `url(img/bg-img/bg-1.jpg)`
};

const slide2 = {
    backgroundImage: `url(img/bg-img/bg-2.jpg)`
};

const slide3 = {
    backgroundImage: `url(img/bg-img/bg-3.jpg)`
};

const Slider = ({ scrollDown }) => (
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
                    <PrimaryButton text={"Ieškoti"} redirect={"/venues"}/>
                </div>
            </div>
            <div className="carousel-item my-carousel-item" style={slide2}>
                <div className="my-caption d-md-block">
                    <h3>Nori sportuoti, bet neturi su kuo?</h3>
                    <p>Prisijunk prie kitų!</p>
                    <PrimaryButton text={"Jungtis"} redirect={"/events"}/>
                </div>
            </div>
            <div className="carousel-item my-carousel-item" style={slide3}>
                <div className="my-caption d-md-block">
                    <h3>Nieko nerandi?</h3>
                    <p>Suorganizuok tai, ko nori!</p>
                    <PrimaryButton text={"Sukurti"} redirect={"/events/create"}/>
                </div>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>

        <a href="#events-list" className="scroll-down" address="true"></a>
    </div>

);

export default Slider;