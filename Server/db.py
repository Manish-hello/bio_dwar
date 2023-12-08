from tinydb import TinyDB, Query

user_db = TinyDB('User.json')
client_db=TinyDB('Client.json')


if __name__ == '__main__':  
    query=Query()
    data=user_db.search((query.user_name=='randi') & (query.password=='radikoban'))
    print(data)