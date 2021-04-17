import { articles } from '../../../data';

// Destructured req object
export default function handler({ query: { id } }, res) {
  const filtered = articles.filter(article => article.id === id);

  filtered.length > 0
    ? res.status(200).json(filtered[0])
    : res
        .status(404)
        .json({ message: `Article with the id of ${id} is not found` });
}