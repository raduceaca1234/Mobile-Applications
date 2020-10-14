package com.example.myapplication

import android.annotation.TargetApi
import android.content.Context
import android.database.Cursor
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CursorAdapter
import android.widget.TextView

class CustomCursorAdapter @TargetApi(Build.VERSION_CODES.HONEYCOMB) constructor(
    context: Context,
    c: Cursor?,
    flags: Int
) : CursorAdapter(context, c, flags) {
    private val layoutInflater: LayoutInflater
    override fun newView(
        context: Context,
        cursor: Cursor,
        viewGroup: ViewGroup
    ): View {
        val v: View = layoutInflater.inflate(R.layout.row_notes, viewGroup, false)
        val holder = MyHolder()
        holder.ListID = v.findViewById<View>(R.id.listID) as TextView
        holder.ListTitle = v.findViewById<View>(R.id.listTitle) as TextView
        holder.ListDetail = v.findViewById<View>(R.id.listDetail) as TextView
        holder.ListCreated = v.findViewById<View>(R.id.listCreated) as TextView
        v.tag = holder
        return v
    }

    override fun bindView(
        view: View,
        context: Context,
        cursor: Cursor
    ) {
        val holder = view.tag as MyHolder
        holder.ListID!!.text = cursor.getString(cursor.getColumnIndex(DBHelper.row_id))
        holder.ListTitle!!.text = cursor.getString(cursor.getColumnIndex(DBHelper.row_title))
        holder.ListDetail!!.text = cursor.getString(cursor.getColumnIndex(DBHelper.row_note))
        holder.ListCreated!!.text = cursor.getString(cursor.getColumnIndex(DBHelper.row_created))
    }

    internal inner class MyHolder {
        var ListID: TextView? = null
        var ListTitle: TextView? = null
        var ListDetail: TextView? = null
        var ListCreated: TextView? = null
    }

    init {
        layoutInflater =
            context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
    }
}