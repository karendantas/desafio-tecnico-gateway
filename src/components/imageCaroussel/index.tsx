import { useRef, useState } from "react";
import { Dimensions, FlatList, Image, View } from "react-native";
import { styles } from "./styles";

const { width } = Dimensions.get("window");

interface Props {
  images: string[];
}

export function ImageCarousel({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  function onViewableItemsChanged({ viewableItems }: any) {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width, height: 500 }}
            resizeMode="cover"
          />
        )}
      />

      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}
