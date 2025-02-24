import React, { useEffect, useState } from 'react';
import S from './style';
import Rectangle from './images/Rectangle.png';
import { useNavigate } from 'react-router-dom';
import Img from './images/Rectangle.png'
import ItemContainer from './ItemContainer';
const Meat = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const getProduct = async () => {
        const response = await fetch(`http://localhost:8000/product/get?categories=고기대용&tag=BEST`)
        const datas = await response.json();
        setProducts(datas)
    }

    useEffect(()=>{
        getProduct()
    },[])

    return (
        <S.TagItemWrapper>
            {products
            .sort(() => Math.random() - 0.5) 
            .slice(0, 4)
            .map((product)=>(
                <ItemContainer
                photoId={product.photoId}
                key={product._id}
                title={product.title}
                description={product.description}
                price={`${product.price.toLocaleString()}원`}
                star={product.star}
                review={product.review}
                image={product.photoId} //이미지 스키마 추가 해야함
                onNavigate={() => navigate(`/details?id=${product._id}`)}
            />
            ))}
        </S.TagItemWrapper>
    );
};

export default Meat;