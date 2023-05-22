import { Text, View, TouchableOpacity } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { api } from '../src/lib/api'
import { useRouter } from 'expo-router'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import * as React from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as SecureStore from 'expo-secure-store'

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/6c6e6d38c37289a16d61',
}

export default function App() {
  const router = useRouter()
  const [, response, promptAsync] = useAuthRequest(
    {
      clientId: '6c6e6d38c37289a16d61',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlw_spacetime',
      }),
    },
    discovery,
  )
  async function handleOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data
    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      handleOAuthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => {
            promptAsync()
          }}
        >
          <Text className="font-alt text-sm uppercase text-gray-900">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat!
      </Text>
    </View>
  )
}
