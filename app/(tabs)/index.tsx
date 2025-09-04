import CardButton from "@/components/CardButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import cn from "clsx";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthStore();
  console.log("user from index.tsx", JSON.stringify(user, null, 2));
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isCardEven: boolean = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isCardEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
              >
                {({ pressed }) => (
                  <>
                    <View className="w-1/2 h-full">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                      />
                    </View>

                    <View
                      className={cn(
                        "offer-card__info",
                        isCardEven ? "pl-10" : "pr-5"
                      )}
                    >
                      <Text className="leading-tight h1-bold text-white-100 font-quicksand-bold">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor="#ffffff"
                      />
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-row w-full px-5 my-5 flex-between">
            <View className="flex-start">
              <Text className="small-bold">Deliver To</Text>
              <TouchableOpacity className="flex-row flex-center gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">
                  Lagos, Nigeria
                </Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <CardButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
