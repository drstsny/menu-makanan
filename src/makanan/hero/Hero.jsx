import Makanan1 from "../../assets/Makanan1.jpeg"
import Makanan2 from "../../assets/Makanan2.jpg"
import Makanan3 from "../../assets/Makanan3.jpg"
import "../style/Makanan.css"

const Hero = () => {
    return(
        <div className="hero-container">
            <div className="hero-header">
                <h1>Silahkan Pilih Menu Di Bawah Ini :</h1>
            </div>
            <div className="makanan-container">
                <div className="makanan">
                    <img src={Makanan1} alt="Makanan1" className="w-64 h-40" />
                    <h1>Makanan</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia est consequatur non nisi perferendis explicabo asperiores a odit, atque aspernatur pariatur voluptates cupiditate fuga molestias distinctio. Eligendi quidem alias deserunt!</p>
                </div>
                <div className="makanan">
                    <img src={Makanan2} alt="Makanan2" className="w-64 h-40" />
                    <h1>Makanan</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti similique culpa ex accusamus veritatis. Saepe, eveniet sit. Aliquam alias est, earum molestiae recusandae minus sapiente quidem voluptas sit, saepe delectus.</p>
                </div>
                <div className="makanan">
                    <img src={Makanan3} alt="Makanan3" className="w-64 h-40"/>
                    <h1>Makanan</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ipsa laudantium cumque harum exercitationem fugiat vel porro sunt, quisquam aspernatur animi praesentium quo illum voluptatum ducimus sit delectus, explicabo facere.</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;