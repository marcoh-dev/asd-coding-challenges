export default function Fallback(request, response) {
  response.status(404).json("Not Found");
}
