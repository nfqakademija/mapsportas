import React from 'react';

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
    <section className="hero-area">
        <div className="hero-slides owl-carousel">

            <div className="single-hero-slide bg-img" style={slide1}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 col-md-10 offset-2 col-lg-9 ">
                            <div className="hero-slides-content">
                                <h2 data-animation="fadeInUp" data-delay="100ms">Nori, bet nežinai kur?</h2>
                                <p data-animation="fadeInUp" data-delay="400ms">Rask sau tinkamiausią vietą!</p>
                                <a href="#" className="btn fitness-btn wel-btn" data-animation="fadeInUp"
                                   data-delay="700ms">Ieškoti</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-hero-slide bg-img" style={slide2}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 col-md-10 offset-2 col-lg-9">
                            <div className="hero-slides-content">
                                <h2 data-animation="fadeInUp" data-delay="100ms">Nori, bet neturi su kuo?</h2>
                                <p data-animation="fadeInUp" data-delay="400ms">Prisijunk prie kitų!</p>
                                <a href="#" className="btn fitness-btn wel-btn" data-animation="fadeInUp"
                                   data-delay="700ms">Jungtis</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-hero-slide bg-img" style={slide3}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 col-md-10 offset-2 col-lg-9 ">
                            <div className="hero-slides-content">
                                <h2 data-animation="fadeInUp" data-delay="100ms">Nori, bet nieko nerandi?</h2>
                                <p data-animation="fadeInUp" data-delay="400ms">Suorganizuok tai, ko nori!.</p>
                                <a href="#" className="btn fitness-btn wel-btn" data-animation="fadeInUp"
                                   data-delay="700ms">Sukurti</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Slider;