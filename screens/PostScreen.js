import React from 'react';
import {
    ScrollView, StyleSheet,
    View, RefreshControl
} from 'react-native';
import { Notifications } from 'expo';
import Articles from '../components/Articles';
import axios from 'axios';
import API from '../constants/API';



export default class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            refreshing: true,
        };
        this.fetchNews = this.fetchNews.bind(this);
    }

    fetchNews() {
        this.setState({
            refreshing: true,
        });
        axios.get(API.endpoints.posts)
            .then(res => {
                const articles = res.data;
                this.setState({
                    articles,
                    refreshing: false,
                });
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    refreshing: false,
                })
            });
    }

    handleRefresh = () => {
        this.setState({
                refreshing: true,
            },
            () => this.fetchNews()
        );
    }

    componentDidMount() {

        this.fetchNews();
    }


    render() {
        let articles = this.state.articles;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh}/>}
                >
                    <View style={styles.container}>
                        {articles.map((article, index) => {
                            return <Articles key={index} articleInfo={article} />
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    contentContainer: {
        paddingTop: 15,
    }
});
