import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Table, Row } from 'react-native-table-component';

/*
todo refactor this code in the future:
1. https://humanitarianbooking.external-api.org/v1/cities/ is a start URL
2. get URLs for previous and next from related sections of the response
3. get api and user key from 'real' authorization functionality
*/
const fetchData = (page) => {
    const pageSuffix = !!page ? `?page=${page}` : '';
    const options = {
        method: 'get',
        url: `https://humanitarianbooking.external-api.org/v1/cities/${pageSuffix}`,
        headers: {
            // todo: put api key here
            'x-api-key': '',
            // todo: put user key here
            'Authorization': 'Token ',
            'Accept-Encoding': 'identity'
        }
    };

    return new Promise((resolve, reject) => {
        axios(options).then(result => {
            resolve(result.data);
        }).catch(reject);
    });
};

export default function Cities() {
    [isDataLoaded, setDataLoaded] = useState(false);
    [count, setCount] = useState(null);
    [previousPage, setPreviousPage] = useState(null);
    [nextPage, setNextPage] = useState(null);
    [page, setPage] = useState('');
    [tableData, setTableData] = useState([]);
    [tableHead] = useState(['name', 'longitude', 'latitude', 'country']);
    [widthArr] = useState([120, 90, 90, 60]);

    const handleBackButton = () => true;
    const back = () => {
        return (
            <TouchableOpacity onPress={() => Actions.pop()}>
                <View style={styles.backBtn}>
                    <Text style={styles.btnText}>back to Login...</Text>
                </View>
            </TouchableOpacity>
        );
    }
    const pageInc = () => {
        setDataLoaded(false);
        if (page === '') {
            setPage('2');
        } else {
            setPage(+page + 1);
        }
    };
    const pageDec = () => {
        if (page !== '') {
            setDataLoaded(false);
            setPage(+page - 1);
        }
    };
    const pageIncView = (disabled) => {
        if (disabled) {
            return (
                <View style={styles.backBtnInactive}>
                    <Text style={styles.btnText}>page forward &gt;&gt;</Text>
                </View>
            );
        }
        return (
            <TouchableOpacity onPress={pageInc}>
                <View style={styles.backBtn}>
                    <Text style={styles.btnText}>page forward &gt;&gt;</Text>
                </View>
            </TouchableOpacity>
        );
    }
    const pageDecView = (disabled) => {
        if (disabled) {
            return (
                <View style={styles.backBtnInactive}>
                    <Text style={styles.btnText}>&lt;&lt;page backward</Text>
                </View>
            );
        }
        return (
            <TouchableOpacity onPress={pageDec}>
                <View style={styles.backBtn}>
                    <Text style={styles.btnText}>&lt;&lt;page backward</Text>
                </View>
            </TouchableOpacity>
        );
    }

    let _isMounted = true;

    useEffect(() => {
        if (_isMounted) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);

            fetchData(page).then(content => {
                setCount(content.count);
                setPreviousPage(content.previous);
                setNextPage(content.next);
                setTableData(content.results.map(record => [record.name, record.longitude, record.latitude, record.country]));
                setDataLoaded(true);
            }).catch(e => {
                Alert.alert(`Error during data reading: ${e.message}`);
            });
        }

        return function () {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            _isMounted = false;
        }
    }, [isDataLoaded, page]);


    if (!isDataLoaded) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading Cities...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Page {!page ? '1' : page} of {Math.ceil(count / 9)}  |  Cities [{count}]</Text>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {
                                tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                        textStyle={styles.text}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
            {pageIncView(nextPage === null)}
            {pageDecView(previousPage === null)}
            {back()}
        </View>
    )
}

const styles = StyleSheet.create({
    title: { color: '#aaaaaa', marginTop: 10, marginBottom: 10, fontSize: 18 },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    backBtn: { fontSize: 18, marginTop: 15, backgroundColor: '#78B7BB', borderRadius: 2, padding: 10, fontSize: 18 },
    backBtnInactive: { fontSize: 18, marginTop: 15, backgroundColor: '#eeeeee', borderRadius: 2, padding: 10, fontSize: 18 }
});
