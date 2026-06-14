function ItemCard({ item }) {
  return (
    <div className="card">
      {item.image && (
        <img
          src={`http://localhost:3000/uploads/${item.image}`}
          alt={item.title}
          width="200"
        />
      )}

      <h3>{item.title}</h3>

      <p>{item.description}</p>

      <p>
        <strong>Status:</strong> {item.status}
      </p>

      <p>
        <strong>Location:</strong> {item.location}
      </p>
    </div>
  );
}

export default ItemCard;