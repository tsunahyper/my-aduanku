#!/bin/bash

# Initialize MongoDB Replica Set
echo "🔄 Initializing MongoDB Replica Set..."

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
sleep 10

# Initialize replica set
echo "🚀 Initializing replica set..."
docker exec mongodb mongosh --eval "
try {
  rs.initiate({
    _id: 'rs0',
    members: [
      { _id: 0, host: 'localhost:27017' }
    ]
  });
  print('✅ Replica set initialized successfully');
} catch (e) {
  if (e.message.includes('already initialized')) {
    print('✅ Replica set already initialized');
  } else {
    print('❌ Error initializing replica set: ' + e.message);
  }
}
"

echo "🎉 MongoDB replica set setup complete!"
echo "You can now restart your services with: docker-compose restart"
