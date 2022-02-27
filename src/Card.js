const Card = ({ key, img, title, meta }) => (
  <div key={key} className="card">
    <img src={img.src} alt={img.alt} />
    <div className="card-data">
      <div className="title">{title}</div>
      <div className="meta">{meta}</div>
    </div>
  </div>
)

export default Card
