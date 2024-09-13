<template>
  <!-- <div class="address" v-if="$store.state.modalView">
      <div>지도 {{ moveLat }} / {{ moveLng }}</div>
      <div id="map" style="width: 500px; height: 400px"></div>
      {{ latitude }} / {{ longitude }}
    </div> -->
  <div class="map_wrap">
    <div
      id="map"
      style="width: 500px; height: 500px; position: relative; overflow: hidden"
    ></div>

    <!-- <div id="menu_wrap" class="bg_white">
        <div class="option">
          <div>
            <form onsubmit="searchPlaces(); return false;">
              키워드 :
              <input type="text" value="이태원 맛집" id="keyword" size="15" />
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const latitude = ref(0);
const longitude = ref(0);

const moveLat = ref(0);
const moveLng = ref(0);

const curLat = ref(0);
const curLng = ref(0);

onMounted(() => {
  if (!("geolocation" in navigator)) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude);

      latitude.value = pos.coords.latitude;
      longitude.value = pos.coords.longitude;

      curLat.value = pos.coords.latitude;
      curLng.value = pos.coords.longitude;

      //   initMap();

      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(initMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=538ac92bd36406d5d3967ac912be981b";
        document.head.appendChild(script);
      }
    },
    (err) => {
      alert(err.message);
    }
  );
});

const initMap = () => {
  const container = document.getElementById("map");
  let options = {
    // center : 지도의 초기 중심 좌표 설정
    center: new kakao.maps.LatLng(latitude.value, longitude.value),
    level: 3,
  };

  let map = new kakao.maps.Map(container, options);

  var markerPosition = new kakao.maps.LatLng(latitude.value, longitude.value);
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
    map: map,
  });

  var geocoder;
  var infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

  kakao.maps.load(() => {
    geocoder = new kakao.maps.services.Geocoder(); // Geocoder 객체를 로드된 후에 초기화

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    //지도 중심좌표
    kakao.maps.event.addListener(map, "center_changed", function () {
      var latlng = map.getCenter();

      moveLat.value = latlng.getLat();
      moveLng.value = latlng.getLng();
    });

    // 지도 클릭 이벤트 리스너 추가
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위치의 좌표
      let clickPosition = mouseEvent.latLng;

      // 기존 마커가 존재하면 제거
      if (marker) {
        marker.setMap(null); // 기존 마커를 지도에서 제거
      }

      // 새 마커 생성
      marker = new kakao.maps.Marker({
        position: clickPosition, // 클릭한 위치로 마커의 위치를 설정
        map: map, // 지도를 마커에 설정하여 표시
      });

      curLat.value = clickPosition.getLat();
      curLng.value = clickPosition.getLng();
      // 새로운 마커 위치 출력 (선택 사항)
      console.log("마커가 생성된 위치:", curLat.value, curLng.value);

      // function searchAddrFromCoords(coords, callback) {
      //   // 좌표로 행정동 주소 정보를 요청합니다
      //   geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      // }

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
      console.log(new kakao.maps.LatLng(curLat.value, curLng.value).Ma);
      console.log(new kakao.maps.LatLng(curLat.value, curLng.value).La);
    });
    let curPos = new kakao.maps.LatLng(curLat.value, curLng.value);

    // searchAddrFromCoords(curPos, (result, status) => {
    //   if (status === kakao.maps.services.Status.OK) {
    //     console.log("초기 위치의 행정동 주소:", result[0].address_name);
    //   }
    // });

    searchDetailAddrFromCoords(curPos, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const detailAddr = !!result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;
        console.log("초기 위치의 법정동 주소:", detailAddr);
      }
    });
  });

  var ps = new kakao.maps.services.Places();

  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  searchPlaces();

  function searchPlaces() {
    var keyword = document.getElementById("keyword").value;

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    ps.keywordSearch(keyword, placesSearchCB);
  }

  function placesSearchCB(data, status, pagination) {
    console.log(status);
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces(places) {
    var listEl = document.getElementById("placesList"),
      menuEl = document.getElementById("menu_wrap"),
      fragment = document.createDocumentFragment(),
      bounds = new kakao.maps.LatLngBounds(),
      listStr = "";

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      (function (marker, title) {
        kakao.maps.event.addListener(marker, "mouseover", function () {
          displayInfowindow(marker, title);
        });

        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });

        itemEl.onmouseover = function () {
          displayInfowindow(marker, title);
        };

        itemEl.onmouseout = function () {
          infowindow.close();
        };
      })(marker, places[i].place_name);

      fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }

  function getListItem(index, places) {
    var el = document.createElement("li"),
      itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>";

    if (places.road_address_name) {
      itemStr +=
        "    <span>" +
        places.road_address_name +
        "</span>" +
        '   <span class="jibun gray">' +
        places.address_name +
        "</span>";
    } else {
      itemStr += "    <span>" + places.address_name + "</span>";
    }

    itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

    el.innerHTML = itemStr;
    el.className = "item";

    return el;
  }

  function addMarker(position, idx, title) {
    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  function displayPagination(pagination) {
    var paginationEl = document.getElementById("pagination"),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

    infowindow.setContent(content);
    infowindow.open(map, marker);
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }
};
</script>

<style lang="scss" scoped>
// .map_wrap {
//   position: fixed;
//   background-color: rgba(150, 150, 150, 0.3);
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 99999;
//   .map {
//     width: 500px;
//     height: 500px;
//   }
// }

.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 500px;
  height: 500px;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  text-align: center;
}
#menu_wrap .option p {
  margin: 10px 0;
}
#menu_wrap .option button {
  margin-left: 5px;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
#placesList .item h5,
#placesList .item .info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#placesList .item .info {
  padding: 10px 0 10px 55px;
}
#placesList .info .gray {
  color: #8a8a8a;
}
#placesList .info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
}
#placesList .info .tel {
  color: #009900;
}
#placesList .item .markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
}
#placesList .item .marker_1 {
  background-position: 0 -10px;
}
#placesList .item .marker_2 {
  background-position: 0 -56px;
}
#placesList .item .marker_3 {
  background-position: 0 -102px;
}
#placesList .item .marker_4 {
  background-position: 0 -148px;
}
#placesList .item .marker_5 {
  background-position: 0 -194px;
}
#placesList .item .marker_6 {
  background-position: 0 -240px;
}
#placesList .item .marker_7 {
  background-position: 0 -286px;
}
#placesList .item .marker_8 {
  background-position: 0 -332px;
}
#placesList .item .marker_9 {
  background-position: 0 -378px;
}
#placesList .item .marker_10 {
  background-position: 0 -423px;
}
#placesList .item .marker_11 {
  background-position: 0 -470px;
}
#placesList .item .marker_12 {
  background-position: 0 -516px;
}
#placesList .item .marker_13 {
  background-position: 0 -562px;
}
#placesList .item .marker_14 {
  background-position: 0 -608px;
}
#placesList .item .marker_15 {
  background-position: 0 -654px;
}
#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}
</style>
