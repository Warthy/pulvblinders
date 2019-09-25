import React from 'react';
import {Image, Platform} from 'react-native';
import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import Colors from "../constants/Colors";
import TabBarIcon from '../components/TabBarIcon';
import HeaderBack from '../components/HeaderBack';
import PostScreen from '../screens/PostScreen';
import TeamScreen from "../screens/TeamScreen";
import FacebookScreen from "../screens/FacebookScreen";
import InstagramScreen from "../screens/InstagramScreen"
import HomeScreen from "../screens/HomeScreen";
import EventsAssociationsScreen from "../screens/EventsAssociationsScreen";
import EventsBDEScreen from "../screens/EventsBDEScreen";

const names = {
    Home: "PULVBLINDERS",
    Team: "L'équipe",
    Events: "Evenements",
    Sponsors: "Sponsor",
    SocialNetworks: 'Reseaux Sociaux'
};

const socialNetworkTab = createMaterialTopTabNavigator({
    Facebook: {
        screen: FacebookScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <TabBarIcon
                    focused={focused}
                    name="facebook-square"
                />
            )
        }
    },
    Instagram: {
        screen: InstagramScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <TabBarIcon
                    focused={focused}
                    name="instagram"
                />
            )
        }
    }
},{
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.tabIconDefault,
        indicatorStyle: {
            backgroundColor: Colors.second
        },
        style: {
            backgroundColor: Colors.main
        }
    },
});

const eventsTab = createMaterialTopTabNavigator({
    Team: {
        screen: EventsBDEScreen,
        navigationOptions: {
            title: "BDE"
        }
    },
    Projects: {
        screen: EventsAssociationsScreen,
        navigationOptions: {
            title: 'Associations'
        }
    }
},{
    tabBarOptions: {
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.tabIconSelected,
        indicatorStyle: {
            backgroundColor: Colors.second
        },
        style: {
            backgroundColor: Colors.main
        }
    },
});


const TabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <TabBarIcon
                    focused={focused}
                    name="home"
                />
            )
        }
    },
    Team: {
        screen: TeamScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <TabBarIcon
                    focused={focused}
                    name="users"
                />
            )
        }
    },
    Events: {
        screen: eventsTab,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <TabBarIcon
                    focused={focused}
                    name="calendar-o"
                />
            )
        }
    },
    Post: {
        screen: PostScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <TabBarIcon
                    focused={focused}
                    name="edit"
                />
            )
        }
    },
    SocialNetworks: {
        screen: socialNetworkTab,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <TabBarIcon
                    focused={focused}
                    name="share-alt"
                />
            )
        }
    }
}, {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.tabIconDefault,
        indicatorStyle: {
            backgroundColor: Colors.second
        },
        style: {
            backgroundColor: Colors.main
        }
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.main,
            tintColor: Colors.tintColor
        },

    },
    navigationOptions: ({navigation}) => {
        const {routeName} = navigation.state.routes[navigation.state.index];
        return {
            headerStyle: Platform.OS === 'ios' ?{
                backgroundColor: Colors.main,
                borderBottomColor: Colors.main,
                shadowColor : Colors.main,
                shadowOpacity: 0,
                shadowOffset: {
                    height: 0,
                },
                shadowRadius: 0,

            }: {
                backgroundColor: Colors.main,
                borderBottomColor: Colors.main,
                elevation: 0
            },
            headerTintColor: Colors.tintColor,
            headerTitle: names[routeName],
            headerTitleStyle: {
                fontFamily: 'clarendon-condensed',
                fontWeight: undefined,
            },
            headerLeft: routeName === 'Home' ? null :
                <HeaderBack navigation={navigation} />,
            headerRight: <Image
                source={ require('../assets/images/logo.png')}
                style={{width: 30, height: 30, marginRight:15}}
            />
        };
    }
});

export default createStackNavigator({
    TabNavigator: TabNavigator
})