import { connect } from "./../utils/connection"

const up = async db => {
  try {
    await db.createCollection("project", {
      validator: {
        $or: [
          {
            name: {
              $type: "string"
            }
          },
          {
            description: {
              $type: "string"
            }
          },
          {
            status: {
              $type: "string",
              $in: ["ACTIVE", "TODO", "COMPLETE", "ABANDONED", "NONE"]
            }
          },
          {
            archived: {
              $type: "bool"
            }
          },
          {
            summary: {
              $type: "string"
            }
          }, 
          {
            user_id: {
              $type: "objectId"
            }
          },
          {
            note_ids: {
              $type: "array"
            }
          }
        ]
      }
    })

    await db.createCollection("user", {
      validator: {
        $or: [
          {
            firstname: {
              $type: "string"
            }
          },
          {
            lastname: {
              $type: "string"
            }
          },
          {
            email: {
              $type: "string"
            }
          },
          {
            password: {
              $type: "string"
            }
          }
        ]
      }
    })

    await db.createCollection("category", {
      validator: {
        $or: [
          {
            user_id: {
              $type: "objectId"
            }
          },
          {
            name: {
              $type: "string"
            }
          },
          {
            color: {
              $type: "string"
            }
          },
          {
            project_ids: {
              $type: "array"
            }
          }
        ]
      }
    })

    await db.createCollection("note", {
      validator: {
        $or: [
          {
            user_id: {
              $type: "objectId"
            }
          },
          {
            name: {
              $type: "string"
            }
          },
          {
            body: {
              $type: "string"
            }
          },
          {
            todos: {
              $type: "array"
            }
          }
        ]
      }
    })
  } catch (err) {
    console.log(err)
  }

  return db
}

const down = async db => {
  try {
    const res = await db.collections()
    const collections = res.map(col => col.s.name)
    await Promise.all(collections.map(col => db.collection(col).drop()))
  } catch (err) {
    console.log(err)
  }

  return db
}

const close = async db => {
  db.close()
}

const arg = process.argv[2]

if (arg === "up") {
  connect()
    .then(up)
    .then(close)
} else if (arg === "down") {
  connect()
    .then(down)
    .then(close)
} else if (arg === "reset") {
  connect()
    .then(down)
    .then(up)
    .then(close)
} else {
  throw new Error("No argument provided")
}
