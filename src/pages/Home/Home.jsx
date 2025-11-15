import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* <h1 className="home-Htitle">Home</h1> */}
      <div className="home-title-container">
      <span className="home-Htitle">
        HOME
      </span>
      </div>
      <img src="Human.png" />
      <h3 className="home-name">67094657 นาย วรินทร วรธรรม</h3>
      <h3 className="home-major">คณะเทคโนโลยีสารสนเทศ <br/>
       สาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์
      </h3>
      <h3 className="home-caption">"อย่าทำวันนี้ให้ดีที่สุด เดี๋ยวพรุ่งนี้ไม่มีอะไรทำ"</h3>
    </div>
  );
}

export default Home;
