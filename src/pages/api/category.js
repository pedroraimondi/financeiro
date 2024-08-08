// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([{ instanceId: 1, label: "Teste 1", _id: 1 }, { instanceId: 2, label: "Teste 2", _id: 2 }, { instanceId: 3, label: "Teste 3", _id: 3 }]);
}
