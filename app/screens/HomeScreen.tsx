/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ProgressBarAndroid,
} from "react-native"
import { AppStackScreenProps } from "../navigators"
import { colors } from "@/theme"
import { Card } from "react-native-paper"
import { PieChart } from "react-native-chart-kit"
import SegmentedControl from "@react-native-community/segmented-control"
import Collapsible from "react-native-collapsible"
import { Screen } from "@/components"

interface LotSummary {
  lot_id: number
  lot_name: string
  current_two_wheeler_count: number
  current_four_wheeler_count: number
  available_two_wheeler_spots: number
  available_four_wheeler_spots: number
  two_wheeler_percentage_full: number
  four_wheeler_percentage_full: number
  overall_percentage_full: number
}

export const HomeScreen: FC<AppStackScreenProps<"HomeScreen">> = observer(({ navigation }) => {
  const [data, setData] = useState<LotSummary[]>([])
  const [vehicleType, setVehicleType] = useState("two_wheeler")
  const [collapsed, setCollapsed] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          "https://spirits-picked-larger-acids.trycloudflare.com/iot/lot_summary",
        )
        const json = await response.json()
        setData(json)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
        setProgress(0) // Reset progress after fetching data
      }
    }

    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 5000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 1 ? 0 : prev + 0.2))
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  const handleManualRefresh = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://spirits-picked-larger-acids.trycloudflare.com/iot/lot_summary",
      )
      const json = await response.json()
      setData(json)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
      setProgress(0) // Reset progress on manual refresh
    }
  }

  const renderPieChart = (lot: LotSummary) => {
    const data = [
      {
        name: "Occupied",
        population:
          vehicleType === "two_wheeler"
            ? lot.current_two_wheeler_count
            : lot.current_four_wheeler_count,
        color: colors.primary,
        legendFontColor: colors.text,
        legendFontSize: 15,
      },
      {
        name: "Available",
        population:
          vehicleType === "two_wheeler"
            ? lot.available_two_wheeler_spots
            : lot.available_four_wheeler_spots,
        color: colors.success,
        legendFontColor: colors.text,
        legendFontSize: 15,
      },
    ]

    return (
      <PieChart
        data={data}
        width={400}
        height={200}
        chartConfig={{
          color: (opacity = 1) => colors.primary,
          labelColor: (opacity = 1) => colors.text,
        }}
        accessor="population"
        backgroundColor={colors.background}
        paddingLeft="15"
      />
    )
  }

  const toggleLot = (lot_id: number) => {
    setCollapsed(collapsed === lot_id ? null : lot_id)
  }

  return (
    <Screen
      preset="fixed"
      backgroundColor={colors.background}
      style={{
        marginTop: 40,
        padding: 20,
      }}
    >
      <SegmentedControl
        values={["Two Wheelers", "Four Wheelers"]}
        selectedIndex={vehicleType === "two_wheeler" ? 0 : 1}
        onValueChange={(value) =>
          setVehicleType(value === "Two Wheelers" ? "two_wheeler" : "four_wheeler")
        }
      />

      {data.map((lot) => (
        <View key={lot.lot_id}>
          <Card style={styles.card} onPress={() => toggleLot(lot.lot_id)}>
            <Card.Title title={lot.lot_name} />
            <Card.Content>
              <Text style={styles.details}>
                {vehicleType === "two_wheeler"
                  ? `${lot.current_two_wheeler_count} / ${lot.available_two_wheeler_spots} spots available`
                  : `${lot.current_four_wheeler_count} / ${lot.available_four_wheeler_spots} spots available`}
              </Text>
              <Text style={styles.details}>Overall occupancy: {lot.overall_percentage_full}%</Text>
            </Card.Content>
          </Card>
          <Collapsible collapsed={collapsed !== lot.lot_id}>
            <View style={styles.collapsibleContent}>{renderPieChart(lot)}</View>
          </Collapsible>
        </View>
      ))}
      {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />}
      <TouchableOpacity onPress={handleManualRefresh} style={styles.refreshButton}>
        <Text style={styles.refreshText}>Refresh</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color={colors.primary} progress={progress} />
      </TouchableOpacity>
    </Screen>
  )
})

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  details: {
    fontSize: 16,
    marginVertical: 4,
  },
  collapsibleContent: {
    padding: 10,
    alignItems: "center",
  },
  loader: {
    marginVertical: 10,
  },
  refreshButton: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  refreshText: {
    color: colors.primary,
    marginBottom: 5,
    fontSize: 16,
  },
})

export default HomeScreen
