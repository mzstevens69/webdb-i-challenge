const router = require("express").Router();

const asyncHandler = require("express-async-handler")

const db = require("../data/dbConfig");

// router.get('/', (req, res) => {
//     db('accounts')
//       .then(accounts => {
//         res.status(200).json(accounts);
//       })
//       .catch(() => {
//         res
//           .status(500)
//           .json({ message: 'Could not retrieve the list of accounts' });
//       });
//   });

router.get("/", asyncHandler(async (req, res, next) => {
    const acct = await db("accounts")
    res.json(acct)
   
}))
// router.get('/:id', (req, res) => {
//     db('accounts')
//       .where({ id: req.params.id })
//       .first()
//       .then(account => {
//         if (account) {
//           res.status(200).json(account);
//         } else {
//           res.status(404).json({ message: 'Account not found' });
//         }
//       });
//   });
//GET acct by id
router.get("/:id", asyncHandler(async (req, res, next) => {
    const acct = await db("accounts").where("id", req.params.id).first()
        res.json(acct)
    
}))


// router.post('/', (req, res) => {
//     if (accountIsValid(req.body)) {
//       db('accounts')
//         .insert(req.body, 'id')
//         .then(([id]) => id)
//         .then(id => {
//           db('accounts')
//             .where({ id })
//             .first()
//             .then(account => {
//               res.status(201).json(account);
//             });
//         })
//         .catch(() => {
//           res.status(500).json({ message: 'Could not add the account' });
//         });
//     } else {
//       res.status(400).json({
//         message: 'Please provide name and budget of zero or more for the account',
//       });
//     }
//   });
router.post("/", asyncHandler(async (req, res, next) => {
    
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        const [id] = await db("accounts").insert(payload)
        res.json(await db("accounts").where("id", id).first())
    
}))
// router.put('/:id', (req, res) => {
//     db('accounts')
//       .where({ id: req.params.id })
//       .update(req.body)
//       .then(count => {
//         if (count) {
//           res.status(200).json({ message: `${count} record(s) updated` });
//         } else {
//           res.status(404).json({ message: 'Account not found' });
//         }
//       })
//       .catch(() => {
//         res.status(500).json({ message: 'Could not update the account' });
//       });
//   });
router.put("/:id", asyncHandler(async (req, res, next) => {
    
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        await db("accounts").where("id", req.params.id).update(payload)
        res.json(await db("accounts").where("id", req.params.id).first())
        
    
    

}))
// router.delete('/:id', (req, res) => {
//     db('accounts')
//       .where({ id: req.params.id })
//       .del()
//       .then(count => {
//         res.status(200).json({ message: `${count} record(s) deleted` });
//       })
//       .catch(() => {
//         res.status(500).json({ message: 'Could not remove the account' });
//       });
//   });

router.delete("/:id", asyncHandler(async (req, res, next) => {
   
        await db("accounts").where("id", req.params.id).del()
        res.status(204).end()
   
}))
function accountIsValid({ name, budget }) {
    return name && typeof budget === 'number' && budget >= 0;
  }
module.exports = router;
