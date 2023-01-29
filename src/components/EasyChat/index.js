import React, { useMemo, useCallback } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'

const FAKE_DATA = [
  { id: 1, body: 'Hello', userId: 1 },
  { id: 2, body: 'Hi', userId: 2 },
  { id: 3, body: 'How are you?', userId: 1 },
  { id: 4, body: 'I am fine', userId: 2 },
]

const Message = function Message({ message, user, isCurrentUser }) {
  return (
    <View style={[styles.message, isCurrentUser && styles.currentUserMessage]}>
      <Text style={styles.messageText}>{message.body}</Text>
    </View>
  )
}

const Messages = function Messages({ users, data, currentUserId }) {
  return (
    <View style={styles.messages}>
      {data.map(message => (
        <Message
          key={message.id}
          message={message}
          user={users[message.userId]}
          isCurrentUser={message.userId === currentUserId}
        />
      ))}
    </View>
  )
}

const Input = function Input({ placeholder }) {
  const [text, setText] = React.useState('')

  const handleSend = useCallback(() => {
    console.log('SENDING MESSAGE', text)
    setText('')
  }, [text, setText])

  return (
    <View style={styles.inputWrapper}>
      <AutoGrowingTextInput
        placeholder={placeholder || 'Enter message...'}
        value={text}
        onChange={setText}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  )
}

const EasyChat = ({ users, currentUserId }) => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  // TODO: get the real data
  const data = isDevelopment ? FAKE_DATA : []

  const usersMap = useMemo(
    () => users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
    [JSON.stringify(users)]
  )

  return (
    <View style={styles.wrapper}>
      <Messages data={data} users={usersMap} currentUserId={currentUserId} />
      <Input />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default EasyChat
