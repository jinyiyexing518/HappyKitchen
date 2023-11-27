import { Carousel } from 'antd';

const contentStyle = {
    height: '100px',
    color: '#fff',
    lineHeight: '100px',
    textAlign: 'center',
    background: '#364d79',
};

const HomeCarousel = () => (
    <Carousel autoplay dots={false}>
        <div>
            <h1 style={contentStyle}>欢迎光临</h1>
        </div>
        <div>
            <h1 style={contentStyle}>欢迎来到开心厨房</h1>
        </div>
        <div>
            <h1 style={contentStyle}>欢迎点菜</h1>
        </div>

    </Carousel>
);
export default HomeCarousel;