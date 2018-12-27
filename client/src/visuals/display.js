import * as d3 from "d3";
import * as topojson from "topojson";

import {
  RATIOS,
  getDisplaySize,
  createProjection,
  getAlbumHeight
} from "./dimensions";

import drawCircle from "./drawCircle";
import drawAlbum from "./drawAlbum";
import drawRefLine from "./drawRefLine";
import drawWave from "./drawWave";
import { createLastSampleInfo } from "./lastSampleInfo";
import { createImprint } from "./imprint";
import getAlbumInfo from "./getAlbumInfo";

const getDisplayScale = (fixedAspectRatio, width) =>
  fixedAspectRatio === RATIOS.sixteenTenths ? width / 5.9 : width / 6.5;

const CONFIG = {
  geoMapUrl: "https://unpkg.com/world-atlas@1.1.4/world/110m.json",
  imprint: false,
  focus: {
    lambda: -10,
    verticalShift: 15,
    scaleFactor: 1
  }
};

/**
 * It stores the state required to render visualizations
 */
export default class Display {
  constructor(set, el) {
    this.config = Object.assign({}, CONFIG, set.visuals);
    this.set = set;
    this.element = el;
    this.el = d3.select(el);
    this.circles = {};
    this.albums = {};
    this.refLines = {};
    this.infos = {};
    this.fixedAspectRatio = RATIOS.sixteenTenths;
  }

  setGeodata(geodata) {
    this.geodata = geodata;
    this.countries = topojson.feature(
      geodata,
      geodata.objects.countries
    ).features;
    this.render();
  }

  show(name) {
    const info = getAlbumInfo(this.set, name);
    if (!info) return;

    const { screenWidth, screenHeight } = getDisplaySize(
      this.fixedAspectRatio,
      this.element
    );
    let [cx, cy] = this.projection(info.lnglat);

    const circle = drawCircle(this.circlesContainer, screenWidth, cx, cy, info);
    this.circles[name] = circle;

    const album = drawAlbum(this.albumsContainer, screenWidth, info);
    this.albums[name] = album;

    const refLine = drawRefLine(
      this.refLinesContainer,
      screenWidth,
      cx,
      cy,
      info.trackNumber,
      info.trackColor
    );
    this.refLines[name] = refLine;

    drawWave(
      this.wavesContainer,
      screenWidth,
      cx,
      cy,
      info.trackColor,
      info.trackVolume
    );

    const lastSampleInfo = createLastSampleInfo(
      this.lastSampleInfoContainer,
      screenWidth,
      screenHeight,
      info
    );
    this.infos[name] = lastSampleInfo;

    if (this.config.imprint) createImprint(info.lnglat, info.trackColor);
  }

  hide(name) {
    const circle = this.circles[name];
    if (circle) {
      circle.remove();
      this.circles[name] = null;
    }

    const album = this.albums[name];
    if (album) {
      album.remove();
      this.albums[name] = null;
    }

    const refLine = this.refLines[name];
    if (refLine) {
      refLine.remove();
      this.refLines[name] = null;
    }

    const lastSampleInfo = this.infos[name];
    if (lastSampleInfo) {
      lastSampleInfo.remove();
      this.infos[name] = null;
    }
  }

  clear() {
    this.el.selectAll("*").remove();
  }

  render() {
    const size = getDisplaySize(this.fixedAspectRatio, this.element);
    const { screenWidth, screenHeight } = size;
    const scale = getDisplayScale(this.fixedAspectRatio, screenWidth);
    const focusedScale = scale * this.config.focus.scaleFactor;
    const lambda = this.config.focus.lambda;
    const verticalShift = this.config.focus.verticalShift;
    const albumsHeight = getAlbumHeight(screenWidth);

    this.clear();

    const svg = this.el
      .append("svg")
      .attr("id", "svgMap")
      .attr("width", screenWidth)
      .attr("height", screenHeight);

    this.mapContainer = svg
      .append("g")
      .attr("transform", `translate(0, ${albumsHeight})`)
      .append("g")
      .attr("id", "map");

    this.albumsContainer = svg.append("g").attr("id", "albums");
    this.refLinesContainer = svg
      .append("g")
      .attr("id", "refLines")
      .attr("transform", `translate(0, ${albumsHeight})`);
    this.circlesContainer = svg
      .append("g")
      .attr("transform", `translate(0, ${albumsHeight})`)
      .append("g")
      .attr("id", "circles");
    this.wavesContainer = svg
      .append("g")
      .attr("id", "waves")
      .attr("transform", `translate(0, ${albumsHeight})`);
    this.lastSampleInfoContainer = svg
      .append("g")
      .attr("id", "lastSampleInfo")
      .attr("transform", `translate(0, ${albumsHeight})`);

    // Draw map
    if (this.geodata) {
      this.projection = createProjection(
        screenWidth,
        screenHeight - albumsHeight,
        focusedScale,
        verticalShift,
        lambda
      );
      const path = d3.geoPath().projection(this.projection);
      this.mapContainer
        .selectAll(".countries")
        .data(this.countries)
        .enter()
        .append("path")
        .attr("id", d => `country${d.id}`)
        .attr("class", "countries")
        .attr("d", path)
        .style("stroke", "#2c2c2c")
        .style("stroke-width", 0.5)
        .style("fill", d => (d.id === "010" ? "none" : "#888888")); // 010 Antartica
    }
  }
}
