import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
import Products from './Products';
import Store from './Store';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Home></Home>
        </View>
    );
}

function ProductsScreen() {
    return <Products />;
}

function GamesScreen() {
    return (
        <View style={styles.container}>
            <Text></Text>
        </View>
    );
    } 

    function NotificationsScreen() {
        return (
            <View style={styles.container}>
                <Text></Text>
            </View>
        );
    }
    function StoreScreen() {
        return (
            
                <Store/>
            
        );
    }

    const Tab = createBottomTabNavigator();

    export default function Menu() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;

                            switch (route.name) {
                                case 'Home':
                                    iconName = 'home';
                                    break;
                                case 'Listar':
                                    iconName = 'list';
                                    break;
                                case 'Games':
                                    iconName = 'gamepad';
                                    break;
                                case 'Ler API':
                                    iconName = 'bell';
                                    break;
                                case 'Loja':
                                    iconName = 'store-alt';
                                    break;
                                default:
                                    iconName = 'add-circle-outline';
                                    break;
                            }
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#8A2BE2',
                        inactiveTintColor: '#777',
                        showLabel: true,
                        backgroundColor: '#9370DB',
                    }}
                >
                    <Tab.Screen name="Home" component={Home} style={styles.container} />
                    <Tab.Screen name="Listar" component={ProductsScreen} />
                    <Tab.Screen name="Games" component={GamesScreen} />
                    <Tab.Screen name="Ler API" component={NotificationsScreen} />
                    <Tab.Screen name="Loja" component={StoreScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
    const styles = StyleSheet.create({
        container: {

            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        iconTabRound: {
            backgroundColor: '#87CEFA',
            width: 60,
            height: 90,
            borderRadius: 30,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 6,
            shadowColor: '#9C27B0',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
        },

    }); 