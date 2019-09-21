import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Table, Row } from 'react-native-table-component';

const fetchData = () => {
    const options = {
        method: 'get',
        url: 'https://humanitarianbooking.external-api.org/v1/cities/',
        headers: {
            'x-api-key': '',
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
    [tableData, setTableData] = useState([]);
    [tableHead] = useState(['name', 'longitude', 'latitude', 'country']);
    [widthArr] = useState([120, 90, 90, 60]);
    [page, setPage] = useState(1);

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

    let _isMounted = true;

    useEffect(() => {
        if (_isMounted) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);

            fetchData().then(content => {
                const _tableData = [];

                for (const record of content.results) {
                    _tableData.push([record.name, record.longitude, record.latitude, record.country]);
                }

                setCount(content.count);
                setTableData(_tableData);
                setDataLoaded(true);
            }).catch(e => {
                Alert.alert(`Error during data reading: ${e.message}`);
            });
        }

        return function () {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            _isMounted = false;
        }
    }, [_isMounted]);


    if (!isDataLoaded) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading Cities...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cities [{count}]</Text>
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
    backBtn: { fontSize: 18, marginTop: 15, backgroundColor: '#78B7BB', borderRadius: 2, padding: 10, fontSize: 18 }
});
